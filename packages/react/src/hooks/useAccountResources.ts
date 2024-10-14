'use client'

import {
  type Config,
  type GetAccountResourcesErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetAccountResourcesData,
  type GetAccountResourcesOptions,
  type GetAccountResourcesQueryFnData,
  type GetAccountResourcesQueryKey,
  getAccountResourcesQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseAccountResourcesParameters<
  config extends Config = Config,
  selectData = GetAccountResourcesData,
> = UnionEvaluate<
  GetAccountResourcesOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountResourcesQueryFnData,
      GetAccountResourcesErrorType,
      selectData,
      GetAccountResourcesQueryKey
    >
>

export type UseAccountResourcesReturnType<
  selectData = GetAccountResourcesData,
> = UseQueryReturnType<selectData, GetAccountResourcesErrorType>

/** https://khizab.dev/react/api/hooks/useAccountResources */
export function useAccountResources<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountResourcesData,
>(
  parameters: UseAccountResourcesParameters<config, selectData> = {} as any,
): UseAccountResourcesReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountResourcesQueryOptions<config>(config, {
    ...(parameters as any),
  })
  const enabled = Boolean(accountAddress && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
