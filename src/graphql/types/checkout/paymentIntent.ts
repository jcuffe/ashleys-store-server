import {
  objectType,
  inputObjectType,
  list,
  nonNull,
  mutationField,
  arg,
} from 'nexus'
import { createOrUpdatePaymentIntent } from 'src/services/stripe'
import { CheckoutItemInput } from './checkoutItem'
import { ShippingAddressInput } from './shippingAddress'

export const PaymentIntent = objectType({
  name: 'PaymentIntent',
  definition(t) {
    t.nonNull.string('clientSecret')
    t.nonNull.string('paymentIntentId')
  },
})

export const PaymentIntentInput = inputObjectType({
  name: 'PaymentIntentInput',
  definition(t) {
    t.field('items', {
      type: list(nonNull(CheckoutItemInput)),
    })
    t.field('shippingAddress', {
      type: ShippingAddressInput,
    })
    t.string('paymentIntentId')
  },
})

export const createOrUpdatePaymentIntentMutation = mutationField(
  'createOrUpdatePaymentIntent',
  {
    type: nonNull(PaymentIntent),
    args: {
      checkout: arg({
        type: nonNull(PaymentIntentInput),
      }),
    },
    resolve: (_, args) => {
      const { items, paymentIntentId, shippingAddress } = args.checkout
      return createOrUpdatePaymentIntent(
        items,
        shippingAddress,
        paymentIntentId,
      )
    },
  },
)
