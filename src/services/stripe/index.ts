import { CartItem } from 'src/data/models/item'
import {
  buildPaymentIntentCreateParams,
  buildPaymentIntentUpdateParams,
  processPaymentIntent,
} from './helpers'
import Stripe from 'stripe'
import { ShippingAddressValues } from './types'

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export const createOrUpdatePaymentIntent = (
  items: CartItem[] | null = null,
  shippingAddress: ShippingAddressValues | null = null,
  paymentIntentId: string | null = null,
) => {
  if (paymentIntentId) {
    return updatePaymentIntent(paymentIntentId, items, shippingAddress)
  }

  if (!items) {
    throw new Error('Payment intent must be created with initial items')
  }

  return createPaymentIntent(items)
}

const createPaymentIntent = async (items: CartItem[]) => {
  const params = buildPaymentIntentCreateParams(items)
  return stripeClient.paymentIntents.create(params).then(processPaymentIntent)
}

const updatePaymentIntent = async (
  paymentIntentId: string,
  items: CartItem[] | null,
  shippingAddress: ShippingAddressValues | null,
) => {
  const params = buildPaymentIntentUpdateParams(items, shippingAddress)
  return stripeClient.paymentIntents
    .update(paymentIntentId, params)
    .then(processPaymentIntent)
}
