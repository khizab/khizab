'use client'

import {
  type Config,
  type GetAccountResourceErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetAccountResourceData,
  type GetAccountResourceOptions,
  type GetAccountResourceQueryFnData,
  type GetAccountResourceQueryKey,
  getAccountResourceQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetAccountResourceParameters<
  config extends Config = Config,
  selectData = GetAccountResourceData,
> = UnionEvaluate<
  GetAccountResourceOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountResourceQueryFnData,
      GetAccountResourceErrorType,
      selectData,
      GetAccountResourceQueryKey
    >
>

export type UseGetAccountResourceReturnType<
  selectData = GetAccountResourceData,
> = UseQueryReturnType<selectData, GetAccountResourceErrorType>

/** https://khizab.dev/react/api/hooks/useGetAccountResource */
export function useGetAccountResource<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountResourceData,
>(
  parameters: UseGetAccountResourceParameters<config, selectData> = {} as any,
): UseGetAccountResourceReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountResourceQueryOptions<config>(config, {
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
