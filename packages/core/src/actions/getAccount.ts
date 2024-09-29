import type { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import { type Config, type Connector } from '../createConfig.js'
import type { Network } from '../types/network.js'

export type GetAccountReturnType =
  | {
      address: AccountInfo
      network: Network | undefined
      connector: Connector
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      address: AccountInfo | undefined
      network: Network | undefined
      connector: Connector | undefined
      isConnected: boolean
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      address: AccountInfo | undefined
      network: Network | undefined
      connector: Connector | undefined
      isConnected: false
      isReconnecting: false
      isConnecting: true
      isDisconnected: false
      status: 'connecting'
    }
  | {
      address: undefined
      network: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

/** https://khizab.sh/core/api/actions/getAccount */
export function getAccount<config extends Config>(
  config: config,
): GetAccountReturnType {
  const uid = config.state.current!

  const connection = config.state.connections.get(uid)
  const address = connection?.account
  const network = config.network as GetAccountReturnType['network']
  const status = config.state.status

  switch (status) {
    case 'connected':
      return {
        address: address!,
        network,
        connector: connection?.connector!,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'reconnecting':
      return {
        address,
        network,
        connector: connection?.connector,
        isConnected: !!address,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status,
      }
    case 'connecting':
      return {
        address,
        network,
        connector: connection?.connector,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'disconnected':
      return {
        address: undefined,
        network: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status,
      }
  }
}
