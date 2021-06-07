import { CartItem } from 'src/data/models/item'
import { ShippingAddressValues } from '../stripe/types'

export const buildEasyPostAddress = (
  shippingAddress: ShippingAddressValues,
) => {
  return {
    name: shippingAddress.name,
    street1: shippingAddress.address1,
    street2: shippingAddress.address2,
    city: shippingAddress.city,
    state: shippingAddress.state,
    zip: shippingAddress.zip,
  }
}

export const buildParcel = (items: CartItem[]) => {
  return {
    // width: 1,
    // length: 1,
    // height: 1,
    weight: 40,
  }
}
