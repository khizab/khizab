import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountModuleErrorType,
  type GetAccountModuleParameters,
  type GetAccountModuleReturnType,
  getAccountModule,
} from '../actions/getAccountModule.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountModuleOptions = GetAccountModuleParameters &
  ScopeKeyParameter

export function getAccountModuleQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountModuleOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountModule<config>(
        config,
        parameters,
      ) as Promise<GetAccountModuleData>
    },
    queryKey: getAccountModuleQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountModuleQueryFnData,
    GetAccountModuleErrorType,
    GetAccountModuleData,
    GetAccountModuleQueryKey
  >
}

export type GetAccountModuleQueryFnData = GetAccountModuleReturnType

export type GetAccountModuleData = GetAccountModuleQueryFnData

export function getAccountModuleQueryKey(
  options: GetAccountModuleOptions = {} as any,
) {
  return ['getAccountModule', filterQueryOptions(options)] as const
}

export type GetAccountModuleQueryKey = ReturnType<
  typeof getAccountModuleQueryKey
>
