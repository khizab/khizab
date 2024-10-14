import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetBalanceErrorType,
  type GetBalanceParameters,
  type GetBalanceReturnType,
  getBalance,
} from '../actions/getBalance.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, PartialBy } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetBalanceOptions = Evaluate<
  PartialBy<GetBalanceParameters, 'accountAddress' | 'coinType'> &
    ScopeKeyParameter
>

export function getBalanceQueryOptions<config extends Config>(
  config: config,
  options: GetBalanceOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { accountAddress, scopeKey: _, ...parameters } = queryKey[1]
      if (!accountAddress) throw new Error('address is required')
      const balance = await getBalance(config, {
        ...(parameters as GetBalanceParameters),
        accountAddress,
      })
      return balance ?? null
    },
    queryKey: getBalanceQueryKey(options),
  } as const satisfies QueryOptions<
    GetBalanceQueryFnData,
    GetBalanceErrorType,
    GetBalanceData,
    GetBalanceQueryKey
  >
}

export type GetBalanceQueryFnData = Evaluate<GetBalanceReturnType> | null

export type GetBalanceData = GetBalanceQueryFnData

export function getBalanceQueryKey(options: GetBalanceOptions = {}) {
  return ['balance', filterQueryOptions(options)] as const
}

export type GetBalanceQueryKey = ReturnType<typeof getBalanceQueryKey>
