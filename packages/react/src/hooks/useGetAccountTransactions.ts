'use client'

import {
  type Config,
  type GetAccountTransactionsErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetAccountTransactionsData,
  type GetAccountTransactionsOptions,
  type GetAccountTransactionsQueryFnData,
  type GetAccountTransactionsQueryKey,
  getAccountTransactionsQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetAccountTransactionsParameters<
  config extends Config = Config,
  selectData = GetAccountTransactionsData,
> = UnionEvaluate<
  GetAccountTransactionsOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountTransactionsQueryFnData,
      GetAccountTransactionsErrorType,
      selectData,
      GetAccountTransactionsQueryKey
    >
>

export type UseGetAccountTransactionsReturnType<
  selectData = GetAccountTransactionsData,
> = UseQueryReturnType<selectData, GetAccountTransactionsErrorType>

/** https://khizab.dev/react/api/hooks/useGetAccountTransactions */
export function useGetAccountTransactions<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountTransactionsData,
>(
  parameters: UseGetAccountTransactionsParameters<
    config,
    selectData
  > = {} as any,
): UseGetAccountTransactionsReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountTransactionsQueryOptions<config>(config, {
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
