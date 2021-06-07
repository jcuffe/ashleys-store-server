import {
  objectType,
  arg,
  nonNull,
  mutationField,
  list,
  inputObjectType,
} from 'nexus'
import { createShippingIntent } from 'src/services/easypost'
import { CheckoutItemInput } from './checkoutItem'
import { ShippingAddressInput } from './shippingAddress'

export const ShippingIntent = objectType({
  name: 'ShippingIntent',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('rates', {
      type: nonNull(list(ShippingRate)),
    })
  },
})

export const ShippingRate = objectType({
  name: 'ShippingRate',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('rate')
    t.nonNull.string('service')
  },
})

export const ShippingIntentInput = inputObjectType({
  name: 'ShippingIntentInput',
  definition(t) {
    t.field('items', {
      type: nonNull(list(nonNull(CheckoutItemInput))),
    })
    t.field('shippingAddress', {
      type: nonNull(ShippingAddressInput),
    })
  },
})

export const createShippingIntentMutation = mutationField(
  'createShippingIntent',
  {
    type: nonNull(ShippingIntent),
    args: {
      shipping: arg({
        type: nonNull(ShippingIntentInput),
      }),
    },
    resolve: (_, args) => {
      const { items, shippingAddress } = args.shipping
      return createShippingIntent(items, shippingAddress)
        .then((r) => {
          console.log('SHIPPING', r)
          return r
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
)
