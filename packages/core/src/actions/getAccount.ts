import { type Config, type Connector } from '../createConfig.js'
import type { AccountInfo } from '../types/connector.js'
import type { Network } from '../types/network.js'

export type GetAccountReturnType =
  | {
      account: AccountInfo
      network: Network | undefined
      connector: Connector
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      account: AccountInfo | undefined
      network: Network | undefined
      connector: Connector | undefined
      isConnected: boolean
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      account: AccountInfo | undefined
      network: Network | undefined
      connector: Connector | undefined
      isConnected: false
      isReconnecting: false
      isConnecting: true
      isDisconnected: false
      status: 'connecting'
    }
  | {
      account: undefined
      network: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

/** https://khizab.dev/core/api/actions/getAccount */
export function getAccount<config extends Config>(
  config: config,
): GetAccountReturnType {
  const uid = config.state.current!

  const connection = config.state.connections.get(uid)
  const account = connection?.account
  const network = config.network as GetAccountReturnType['network']
  const status = config.state.status

  switch (status) {
    case 'connected':
      return {
        account: account!,
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
        account,
        network,
        connector: connection?.connector,
        isConnected: !!account,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status,
      }
    case 'connecting':
      return {
        account,
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
        account: undefined,
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
