import { AccountAddress, Network as AptosNetwork } from '@aptos-labs/ts-sdk'
import type { IsUndefined } from './utils.js'

export { AptosNetwork as NetworkName }
export type Network = {
  /** Collection of block explorers */
  blockExplorers?:
    | {
        [key: string]: ChainBlockExplorer
        default: ChainBlockExplorer
      }
    | undefined
  /** ID in number form */
  id: number
  /** Human-readable name */
  name: AptosNetwork
  /** Collection of RPC endpoints */
  rpcUrls: {
    [key: string]: readonly string[]
    default: readonly string[]
  }
  ensCollectionAddress?: `0x${string}`
  /** Flag for test networks */
  testnet?: boolean | undefined
}

/////////////////////////////////////////////////////////////////////
// Constants

type ChainBlockExplorer = {
  name: string
  url: string
  apiUrl?: string | undefined
}

export type ChainContract = {
  address: AccountAddress
  blockCreated?: number | undefined
}

/////////////////////////////////////////////////////////////////////
// Utils

export type ExtractChain<
  chains extends readonly Network[],
  chainId extends Network['id'],
> = Extract<chains[number], { id: chainId }>

export type DeriveChain<
  chain extends Network | undefined,
  chainOverride extends Network | undefined,
> = chainOverride extends Network ? chainOverride : chain

export type GetChainParameter<
  chain extends Network | undefined,
  chainOverride extends Network | undefined = Network | undefined,
> = IsUndefined<chain> extends true
  ? { chain: chainOverride | null }
  : { chain?: chainOverride | null | undefined }
