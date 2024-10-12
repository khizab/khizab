import type { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import type { Config, Connection, Connector } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import {
  type ConnectorAccountNotFoundErrorType,
  ConnectorNotConnectedError,
  type ConnectorNotConnectedErrorType,
  ConnectorUnavailableReconnectingError,
  type ConnectorUnavailableReconnectingErrorType,
} from '../errors/config.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'

export type GetConnectorParameters = Compute<ConnectorParameter>

export type GetConnectorReturnType = Connector

export type GetConnectorErrorType =
  | ConnectorAccountNotFoundErrorType
  | ConnectorNotConnectedErrorType
  | ConnectorUnavailableReconnectingErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getConnector */
export async function getConnector<config extends Config,>(
  config: config,
  parameters: GetConnectorParameters = {},
): Promise<GetConnectorReturnType> {
  // Get connection
  let connection: Connection | undefined
  if (parameters.connector) {
    const { connector } = parameters
    if (config.state.status === 'reconnecting' && !connector.getAccount)
      throw new ConnectorUnavailableReconnectingError({ connector })

    const account = await connector.getAccount()

    connection = {
      account: account as AccountInfo,
      connector,
    }
  } else connection = config.state.connections.get(config.state.current!)
  if (!connection) throw new ConnectorNotConnectedError()

  return connection.connector as GetConnectorReturnType
}
