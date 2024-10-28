import { type CreateConnectorFn } from '../connectors/createConnector.js'
import type { Config, Connection, Connector } from '../createConfig.js'
import type { ErrorType } from '../errors/base.js'
import type { AccountInfo } from '../types/connector.js'
import { type Evaluate } from '../types/utils.js'

export type ReconnectParameters = {
  /** Connectors to attempt reconnect with */
  connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
}

export type ReconnectReturnType = Evaluate<Connection>[]

export type ReconnectErrorType = ErrorType

let isReconnecting = false

/** https://khizab.dev/core/api/actions/reconnect */
export async function reconnect(
  config: Config,
  parameters: ReconnectParameters = {},
): Promise<ReconnectReturnType> {
  // If already reconnecting, do nothing
  if (isReconnecting) return []
  isReconnecting = true

  config.setState((x) => ({
    ...x,
    status: x.current ? 'reconnecting' : 'connecting',
  }))

  const connectors: Connector[] = []
  if (parameters.connectors?.length) {
    for (const connector_ of parameters.connectors) {
      let connector: Connector
      // "Register" connector if not already created
      if (typeof connector_ === 'function')
        connector = config._internal.connectors.setup(connector_)
      else connector = connector_
      connectors.push(connector)
    }
  } else connectors.push(...config.connectors)

  // Try recently-used connectors first
  let recentConnectorId
  try {
    recentConnectorId = await config.storage?.getItem('recentConnectorId')
  } catch {}
  const scores: Record<string, number> = {}
  for (const [, connection] of config.state.connections) {
    scores[connection.connector.id] = 1
  }
  if (recentConnectorId) scores[recentConnectorId] = 0

  const filtered_connectors = connectors.filter(
    (x) => scores[x.id] !== undefined,
  )

  const sorted = [...filtered_connectors].sort(
    (a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10),
  )

  console.log({ sorted, filtered_connectors, scores })
  // Iterate through each connector and try to connect
  let connected = false
  const connections: Connection[] = []
  const providers: unknown[] = []

  for (const connector of sorted) {
    const provider_ = await connector.getProvider()
    if (!provider_) continue

    if (providers.some((provider) => provider === provider_)) continue

    const data = await connector
      .connect({ isReconnecting: true })
      .catch(() => null)
    if (!data) continue

    connector.emitter.off('connect', config._internal.events.connect)
    connector.emitter.on('change', config._internal.events.change)
    connector.emitter.on('disconnect', config._internal.events.disconnect)

    config.setState((x) => {
      const connections = new Map(connected ? x.connections : new Map()).set(
        connector.uid,
        { account: data, connector },
      )
      return {
        ...x,
        current: connected ? x.current : connector.uid,
        connections,
      }
    })
    connections.push({
      account: data as AccountInfo,
      connector,
    })
    providers.push(provider_)
    connected = true
  }

  // Prevent overwriting connected status from race condition
  if (
    config.state.status === 'reconnecting' ||
    config.state.status === 'connecting'
  ) {
    // If connecting didn't succeed, set to disconnected
    if (!connected)
      config.setState((x) => ({
        ...x,
        connections: new Map(),
        current: undefined,
        status: 'disconnected',
      }))
    else config.setState((x) => ({ ...x, status: 'connected' }))
  }

  isReconnecting = false
  return connections
}
