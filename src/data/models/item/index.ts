export interface Item {
  id: number
  price: number
  name: string
}

export interface CartItem {
  productId: number
  quantity: number
}

interface ItemLookup {
  [key: number]: Item
}

export const itemData: ItemLookup = {
  1: {
    id: 1,
    name: 'CBD Scrub',
    price: 1000,
  },
  2: {
    id: 2,
    name: 'CBD Salts',
    price: 1500,
  },
  3: {
    id: 3,
    name: 'THC Cooler',
    price: 1000,
  },
  4: {
    id: 4,
    name: 'THC Sugar',
    price: 2000,
  },
}
