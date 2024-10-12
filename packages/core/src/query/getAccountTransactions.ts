import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountTransactionsErrorType,
  type GetAccountTransactionsParameters,
  type GetAccountTransactionsReturnType,
  getAccountTransactions,
} from '../actions/getAccountTransactions.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountTransactionsOptions = GetAccountTransactionsParameters &
  ScopeKeyParameter

export function getAccountTransactionsQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountTransactionsOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountTransactions<config>(
        config,
        parameters,
      ) as Promise<GetAccountTransactionsData>
    },
    queryKey: getAccountTransactionsQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountTransactionsQueryFnData,
    GetAccountTransactionsErrorType,
    GetAccountTransactionsData,
    GetAccountTransactionsQueryKey
  >
}

export type GetAccountTransactionsQueryFnData = GetAccountTransactionsReturnType

export type GetAccountTransactionsData = GetAccountTransactionsQueryFnData

export function getAccountTransactionsQueryKey(
  options: GetAccountTransactionsOptions = {} as any,
) {
  return ['getAccountTransactions', filterQueryOptions(options)] as const
}

export type GetAccountTransactionsQueryKey = ReturnType<
  typeof getAccountTransactionsQueryKey
>
