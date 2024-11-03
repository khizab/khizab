import { type CreateConnectorFn } from '../connectors/createConnector.js'
import { type Config, type Connector } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import {
  ConnectorAlreadyConnectedError,
  type ConnectorAlreadyConnectedErrorType,
} from '../errors/config.js'
import type { AccountInfo } from '../types/connector.js'
import { type Compute } from '../types/utils.js'

export type ConnectParameters = Compute<{
  connector: Connector | CreateConnectorFn
}>

export type ConnectReturnType = {
  account: AccountInfo
}

export type ConnectErrorType =
  | ConnectorAlreadyConnectedErrorType
  // connector.connect()
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/connect */
export async function connect<config extends Config>(
  config: config,
  parameters: ConnectParameters,
): Promise<ConnectReturnType> {
  console.log({ parameters: parameters })

  // "Register" connector if not already created
  let connector: Connector
  if (typeof parameters.connector === 'function') {
    connector = config._internal.connectors.setup(parameters.connector)
  } else connector = parameters.connector

  // Check if connector is already connected
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError()

  try {
    config.setState((x) => ({ ...x, status: 'connecting' }))
    connector.emitter.emit('message', { type: 'connecting' })

    const account = await connector.connect()
    console.log({ account })

    connector.emitter.off('connect', config._internal.events.connect)
    connector.emitter.on('change', config._internal.events.change)
    connector.emitter.on('disconnect', config._internal.events.disconnect)

    await config.storage?.setItem('recentConnectorId', connector.id)
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        account,
        connector: connector,
      }),
      current: connector.uid,
      status: 'connected',
    }))

    return { account }
  } catch (error) {
    config.setState((x) => ({
      ...x,
      // Keep existing connector connected in case of error
      status: x.current ? 'connected' : 'disconnected',
    }))
    throw error
  }
}
