import { CartItem } from 'src/data/models/item'

export const findMinimumPackageDimensions = (items: CartItem[]) => {
  return {
    width: 6,
    length: 12,
    height: 6,
  }
}
