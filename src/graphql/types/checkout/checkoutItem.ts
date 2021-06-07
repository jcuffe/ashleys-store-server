import { inputObjectType } from 'nexus'

export const CheckoutItemInput = inputObjectType({
  name: 'CheckoutItemInput',
  definition(t) {
    t.nonNull.int('productId')
    t.nonNull.int('quantity')
  },
})
