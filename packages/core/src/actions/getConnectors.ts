import type { Config, Connector } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetConnectorsReturnType = readonly Connector[]

let previousConnectors: readonly Connector[] = []

/** https://khizab.dev/core/api/actions/getConnectors */
export function getConnectors(config: Config): GetConnectorsReturnType {
  const connectors = config.connectors
  if (deepEqual(previousConnectors, connectors)) return previousConnectors
  previousConnectors = connectors
  return connectors
}
