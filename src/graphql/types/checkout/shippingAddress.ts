import { inputObjectType } from 'nexus'

export const ShippingAddressInput = inputObjectType({
  name: 'ShippingAddressInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('address1')
    t.nonNull.string('address2')
    t.nonNull.string('city')
    t.nonNull.string('state')
    t.nonNull.string('zip')
  },
})
