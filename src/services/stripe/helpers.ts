import { CartItem, itemData } from 'src/data/models/item'
import { ShippingAddressValues } from './types'
import type { Stripe } from 'stripe'
import { CLIENT_SECRET_MISSING } from './errors'

const CURRENCY = 'usd' // no plans for world domination, yet

export const buildPaymentIntentCreateParams = (
  items: CartItem[],
): Stripe.PaymentIntentCreateParams => {
  return {
    currency: CURRENCY,
    amount: calculateOrderAmount(items),
  }
}

export const buildPaymentIntentUpdateParams = (
  items: CartItem[] | null,
  shippingAddress: ShippingAddressValues | null,
): Stripe.PaymentIntentUpdateParams => {
  const amount = items ? calculateOrderAmount(items) : null
  const shipping = shippingAddress
    ? translateShippingData(shippingAddress)
    : null

  return {
    ...(amount && { amount }),
    ...shipping,
  }
}

export const calculateOrderAmount = (items: CartItem[]): number => {
  return items
    .map((item) => itemData[item.productId].price)
    .reduce((total, price) => total + price)
}

export const translateShippingData = (
  shippingAddress: ShippingAddressValues,
): Partial<Stripe.PaymentIntentCreateParams> => {
  return {
    shipping: {
      address: {
        line1: shippingAddress.address1,
        line2: shippingAddress.address2,
        postal_code: shippingAddress.zip,
      },
      name: shippingAddress.name,
    },
  }
}

export const processPaymentIntent = (paymentIntent: Stripe.PaymentIntent) => {
  if (paymentIntent.client_secret === null) {
    throw new Error(CLIENT_SECRET_MISSING)
  }

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  }
}
