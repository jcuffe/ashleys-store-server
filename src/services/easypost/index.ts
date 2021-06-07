// EasyPost has no typings :(
import EasyPost from '@easypost/api'

import { CartItem } from 'src/data/models/item'
import { ShippingAddressValues } from '../stripe/types'
import { buildEasyPostAddress, buildParcel } from './helpers'
import { FROM_ADDRESS } from './constants'

const client = new EasyPost(process.env.EASY_POST_API_KEY)

export const createShippingIntent = async (
  items: CartItem[],
  shippingAddress: ShippingAddressValues,
) => {
  const easyPostAddress = buildEasyPostAddress(shippingAddress)
  const parcelArgs = buildParcel(items)

  const [to_address, from_address, parcel] = await Promise.all([
    new client.Address(easyPostAddress).save(),
    new client.Address(FROM_ADDRESS).save(),
    new client.Parcel(parcelArgs).save(),
  ])

  const shipmentPromise = new client.Shipment({
    to_address,
    from_address,
    parcel,
  }).save()

  return shipmentPromise
}
