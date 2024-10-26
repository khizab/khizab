import { Emitter } from '../createEmitter.js'

import { type Storage } from '../createStorage.js'
import type { Network } from '../types/network.js'
import { type Evaluate } from '../types/utils.js'
import type {
  AccountInfo,
  NetworkInfo,
  OnNetworkChange,
  SignMessagePayload,
  SignMessageResponse,
} from '../types/connector.js'
import {
  type HexInput,
  type InputEntryFunctionData,
  type InputGenerateTransactionOptions,
} from '@aptos-labs/ts-sdk'
import type { AptosWalletErrorResult } from '../errors/connector.js'

export type ConnectorEventMap = {
  change: AccountInfo
  connect: AccountInfo
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown | undefined }
}

export interface PluginProvider {
  connect: () => Promise<AccountInfo>
  account: () => Promise<AccountInfo>
  disconnect: () => Promise<void>
  signAndSubmitTransaction: (
    transaction: any,
    options?: any,
  ) => Promise<{ hash: HexInput } | AptosWalletErrorResult>
  signTransaction: (
    transaction: any,
    options?: any,
  ) => Promise<Uint8Array | AptosWalletErrorResult>
  signMessage: (message: SignMessagePayload) => Promise<SignMessageResponse>
  network: () => Promise<NetworkInfo>
  onAccountChange: (
    listener: (newAddress: AccountInfo) => Promise<void>,
  ) => Promise<void>
  onNetworkChange: OnNetworkChange
}

export type CreateConnectorFn<
  provider = unknown,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
> = (config: {
  network: Network
  emitter: Emitter<ConnectorEventMap>
  storage?: Evaluate<Storage<storageItem>> | null | undefined
}) => Evaluate<
  {
    readonly icon?: string | undefined
    readonly id: string
    readonly name: string
    readonly type: string

    setup?(): Promise<void>
    connect(
      parameters?: { isReconnecting?: boolean | undefined } | undefined,
    ): Promise<AccountInfo>
    disconnect(): Promise<void>
    getAccount(): Promise<AccountInfo>
    getProvider(): provider | never
    onAccountChange(callback: any): Promise<void>
    signAndSubmitTransaction: (transaction: {
      payload: InputEntryFunctionData
      options?: InputGenerateTransactionOptions
    }) => Promise<{ hash: HexInput } | AptosWalletErrorResult>
    signTransaction: (transaction: {
      payload: InputEntryFunctionData
      options?: InputGenerateTransactionOptions
    }) => Promise<Uint8Array | AptosWalletErrorResult>
    signMessage: (message: SignMessagePayload) => Promise<SignMessageResponse>
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
>(createConnectorFn: CreateConnectorFn<provider, properties, storageItem>) {
  return createConnectorFn
}
