import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountModulesErrorType,
  type GetAccountModulesParameters,
  type GetAccountModulesReturnType,
  getAccountModules,
} from '../actions/getAccountModules.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountModulesOptions = GetAccountModulesParameters &
  ScopeKeyParameter

export function getAccountModulesQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountModulesOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountModules<config>(
        config,
        parameters,
      ) as Promise<GetAccountModulesData>
    },
    queryKey: getAccountModulesQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountModulesQueryFnData,
    GetAccountModulesErrorType,
    GetAccountModulesData,
    GetAccountModulesQueryKey
  >
}

export type GetAccountModulesQueryFnData = GetAccountModulesReturnType

export type GetAccountModulesData = GetAccountModulesQueryFnData

export function getAccountModulesQueryKey(
  options: GetAccountModulesOptions = {} as any,
) {
  return ['getAccountModules', filterQueryOptions(options)] as const
}

export type GetAccountModulesQueryKey = ReturnType<
  typeof getAccountModulesQueryKey
>
