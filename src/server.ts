import env from 'dotenv'
env.config()

import path from 'path'

import express from 'express'

import Stripe from 'stripe'
import { ApolloServer } from 'apollo-server-express'
import { schema } from 'src/graphql/schema'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
})

const app = express()
const resolve = path.resolve

app.use(express.static(process.env.STATIC_DIR as string))
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    console.log(req.originalUrl)
    if (req.originalUrl === '/webhook') {
      next()
    } else {
      express.json()(req, res, next)
    }
  },
)

app.get('/checkout', (_: express.Request, res: express.Response): void => {
  // Serve checkout page.
  const indexPath = resolve(process.env.STATIC_DIR + '/index.html')
  res.sendFile(indexPath)
})

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks
app.post(
  '/webhook',
  // Retrieve the raw body as a buffer.
  express.raw({ type: 'application/json' }),
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.get('stripe-signature') as string,
        process.env.STRIPE_WEBHOOK_SECRET,
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      res.sendStatus(400)
      return
    }

    // Extract the data from the event.
    const data: Stripe.Event.Data = event.data
    const eventType: string = event.type

    if (eventType === 'payment_intent.succeeded') {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent
      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`)
      console.log('💰 Payment captured!')
    } else if (eventType === 'payment_intent.payment_failed') {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`)
      console.log('❌ Payment failed.')
    }
    res.sendStatus(200)
  },
)

const apolloServer = new ApolloServer({ schema })

apolloServer.applyMiddleware({ app })

app.listen(process.env.PORT, (): void =>
  console.log(`Node server listening on port ${process.env.PORT}!`),
)
