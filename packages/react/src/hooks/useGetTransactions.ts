'use client'

import {
  type Config,
  type GetTransactionsErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetTransactionsData,
  type GetTransactionsOptions,
  type GetTransactionsQueryFnData,
  type GetTransactionsQueryKey,
  getTransactionsQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetTransactionsParameters<
  config extends Config = Config,
  selectData = GetTransactionsData,
> = UnionEvaluate<
  GetTransactionsOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetTransactionsQueryFnData,
      GetTransactionsErrorType,
      selectData,
      GetTransactionsQueryKey
    >
>

export type UseGetTransactionsReturnType<selectData = GetTransactionsData,> =
  UseQueryReturnType<selectData, GetTransactionsErrorType>

/** https://khizab.dev/react/api/hooks/useGetTransactions */
export function useGetTransactions<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionsData,
>(
  parameters: UseGetTransactionsParameters<config, selectData> = {} as any,
): UseGetTransactionsReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)

  const options = getTransactionsQueryOptions<config>(config, {
    ...(parameters as any),
  })

  return useQuery({
    ...query,
    ...options,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
