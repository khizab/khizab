import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountResourceErrorType,
  type GetAccountResourceParameters,
  type GetAccountResourceReturnType,
  getAccountResource,
} from '../actions/getAccountResource.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountResourceOptions = GetAccountResourceParameters &
  ScopeKeyParameter

export function getAccountResourceQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountResourceOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountResource<config>(
        config,
        parameters,
      ) as Promise<GetAccountResourceData>
    },
    queryKey: getAccountResourceQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountResourceQueryFnData,
    GetAccountResourceErrorType,
    GetAccountResourceData,
    GetAccountResourceQueryKey
  >
}

export type GetAccountResourceQueryFnData = GetAccountResourceReturnType

export type GetAccountResourceData = GetAccountResourceQueryFnData

export function getAccountResourceQueryKey(
  options: GetAccountResourceOptions = {} as any,
) {
  return ['getAccountResource', filterQueryOptions(options)] as const
}

export type GetAccountResourceQueryKey = ReturnType<
  typeof getAccountResourceQueryKey
>
