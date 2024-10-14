import type { NetworkName } from './network.js'

export type NetworkInfo = {
  name: NetworkName
  chainId?: string
  url?: string
}

type WalletName<T extends string = string> = T & {
  __brand__: 'WalletName'
}
export type WalletInfo = {
  name: WalletName
  icon: string
  url: string
}
export type AccountInfo = {
  address: string
  publicKey: string | string[]
  minKeysRequired?: number
  ansName?: string | null
}
export interface SignMessagePayload {
  address?: boolean
  application?: boolean
  chainId?: boolean
  message: string
  nonce: string
}
export interface SignMessageResponse {
  address?: string
  application?: string
  chainId?: number
  fullMessage: string
  message: string
  nonce: string
  prefix: 'APTOS'
  signature: string | string[]
  bitmap?: Uint8Array
}
