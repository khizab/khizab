'use client'

import {
  type Config,
  type GetConnectorErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetConnectorData,
  type GetConnectorOptions,
  type GetConnectorQueryFnData,
  type GetConnectorQueryKey,
  getConnectorQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetConnectorParameters<
  config extends Config = Config,
  selectData = GetConnectorData,
> = UnionEvaluate<
  GetConnectorOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetConnectorQueryFnData,
      GetConnectorErrorType,
      selectData,
      GetConnectorQueryKey
    >
>

export type UseGetConnectorReturnType<selectData = GetConnectorData,> =
  UseQueryReturnType<selectData, GetConnectorErrorType>

/** https://khizab.dev/react/api/hooks/useGetConnector */
export function useGetConnector<
  config extends Config = ResolvedRegister['config'],
  selectData = GetConnectorData,
>(
  parameters: UseGetConnectorParameters<config, selectData> = {} as any,
): UseGetConnectorReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)

  const options = getConnectorQueryOptions<config>(config, {
    ...(parameters as any),
  })
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
