'use client'

import {
  type Config,
  type GetAccountModulesErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetAccountModulesData,
  type GetAccountModulesOptions,
  type GetAccountModulesQueryFnData,
  type GetAccountModulesQueryKey,
  getAccountModulesQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetAccountModulesParameters<
  config extends Config = Config,
  selectData = GetAccountModulesData,
> = UnionEvaluate<
  GetAccountModulesOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountModulesQueryFnData,
      GetAccountModulesErrorType,
      selectData,
      GetAccountModulesQueryKey
    >
>

export type UseGetAccountModulesReturnType<
  selectData = GetAccountModulesData,
> = UseQueryReturnType<selectData, GetAccountModulesErrorType>

/** https://khizab.dev/react/api/hooks/useGetAccountModules */
export function useGetAccountModules<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountModulesData,
>(
  parameters: UseGetAccountModulesParameters<config, selectData> = {} as any,
): UseGetAccountModulesReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountModulesQueryOptions<config>(config, {
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
