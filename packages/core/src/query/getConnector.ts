import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetConnectorErrorType,
  type GetConnectorParameters,
  type GetConnectorReturnType,
  getConnector,
} from '../actions/getConnector.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetConnectorOptions = GetConnectorParameters & ScopeKeyParameter

export function getConnectorQueryOptions<config extends Config,>(
  config: config,
  options: GetConnectorOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getConnector<config>(
        config,
        parameters,
      ) as Promise<GetConnectorData>
    },
    queryKey: getConnectorQueryKey(options),
  } as const satisfies QueryOptions<
    GetConnectorQueryFnData,
    GetConnectorErrorType,
    GetConnectorData,
    GetConnectorQueryKey
  >
}

export type GetConnectorQueryFnData = GetConnectorReturnType

export type GetConnectorData = GetConnectorQueryFnData

export function getConnectorQueryKey(options: GetConnectorOptions = {} as any) {
  return ['getConnector', filterQueryOptions(options)] as const
}

export type GetConnectorQueryKey = ReturnType<typeof getConnectorQueryKey>
