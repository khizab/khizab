import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountInfoErrorType,
  type GetAccountInfoParameters,
  type GetAccountInfoReturnType,
  getAccountInfo,
} from '../actions/getAccountInfo.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountInfoOptions = GetAccountInfoParameters & ScopeKeyParameter

export function getAccountInfoQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountInfoOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountInfo<config>(
        config,
        parameters,
      ) as Promise<GetAccountInfoData>
    },
    queryKey: getAccountInfoQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountInfoQueryFnData,
    GetAccountInfoErrorType,
    GetAccountInfoData,
    GetAccountInfoQueryKey
  >
}

export type GetAccountInfoQueryFnData = GetAccountInfoReturnType

export type GetAccountInfoData = GetAccountInfoQueryFnData

export function getAccountInfoQueryKey(
  options: GetAccountInfoOptions = {} as any,
) {
  return ['getAccountInfo', filterQueryOptions(options)] as const
}

export type GetAccountInfoQueryKey = ReturnType<typeof getAccountInfoQueryKey>
