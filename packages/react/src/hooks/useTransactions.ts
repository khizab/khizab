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

export type UseTransactionsParameters<
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

export type UseTransactionsReturnType<selectData = GetTransactionsData,> =
  UseQueryReturnType<selectData, GetTransactionsErrorType>

/** https://khizab.dev/react/api/hooks/useTransactions */
export function useTransactions<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionsData,
>(
  parameters: UseTransactionsParameters<config, selectData> = {} as any,
): UseTransactionsReturnType<selectData> {
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
