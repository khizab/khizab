import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionsErrorType,
  type GetTransactionsParameters,
  type GetTransactionsReturnType,
  getTransactions,
} from '../actions/getTransactions.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetTransactionsOptions = GetTransactionsParameters &
  ScopeKeyParameter

export function getTransactionsQueryOptions<config extends Config,>(
  config: config,
  options: GetTransactionsOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getTransactions<config>(
        config,
        parameters,
      ) as Promise<GetTransactionsData>
    },
    queryKey: getTransactionsQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionsQueryFnData,
    GetTransactionsErrorType,
    GetTransactionsData,
    GetTransactionsQueryKey
  >
}

export type GetTransactionsQueryFnData = GetTransactionsReturnType

export type GetTransactionsData = GetTransactionsQueryFnData

export function getTransactionsQueryKey(
  options: GetTransactionsOptions = {} as any,
) {
  return ['getTransactions', filterQueryOptions(options)] as const
}

export type GetTransactionsQueryKey = ReturnType<typeof getTransactionsQueryKey>
