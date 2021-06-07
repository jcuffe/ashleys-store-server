declare module '@easypost/api' {
  class EasyPost {
    Address: typeof AddressFactory
    Parcel: typeof ParcelFactory
    Shipment: typeof ShipmentFactory

    constructor(apiKey: string)
  }

  export interface ParcelCreationArgs {
    width?: number
    length?: number
    height?: number
    weight: number
  }

  export interface Parcel {
    id: string
    object: string
    length: number
    width: number
    height: number
    predefined_package: string | null
    weight: number
    created_at: string
    updated_at: string
  }

  class ParcelFactory {
    constructor(args: ParcelCreationArgs)
    save(): Promise<Parcel>
  }

  export interface AddressCreationArgs {
    name: string
    street1: string
    street2?: string
    city: string
    state: string
    zip: string
    country?: string
    phone?: string
  }

  export interface Address {
    name: string
    street1: string
    street2: string
    city: string
    state: string
    zip: string
    country: string
    phone: string
  }

  class AddressFactory {
    constructor(args: AddressCreationArgs)
    save(): Promise<Address>
  }

  export interface ShipmentCreationArgs {
    to_address: Address
    from_address: Address
    parcel: Parcel
  }

  export interface Shipment {
    to_address: Address
    from_address: Address
    parcel: Parcel
  }

  class ShipmentFactory {
    constructor(args: ShipmentCreationArgs)
    save(): Promise<Shipment>
  }

  export default EasyPost
}
