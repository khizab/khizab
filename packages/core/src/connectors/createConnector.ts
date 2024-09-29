import type { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import { Emitter } from '../createEmitter.js'

import { type Storage } from '../createStorage.js'
import type { Network } from '../types/network.js'
import { type Evaluate } from '../types/utils.js'

export type ConnectorEventMap = {
  change: AccountInfo
  connect: AccountInfo
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown | undefined }
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
    switchNetwork?(parameters: { chainId: number }): Promise<Network>

    onAccountChanged(callback: any): Promise<void>
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
>(createConnectorFn: CreateConnectorFn<provider, properties, storageItem>) {
  return createConnectorFn
}
