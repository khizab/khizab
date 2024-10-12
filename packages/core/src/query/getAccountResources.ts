import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetAccountResourcesErrorType,
  type GetAccountResourcesParameters,
  type GetAccountResourcesReturnType,
  getAccountResources,
} from '../actions/getAccountResources.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetAccountResourcesOptions = GetAccountResourcesParameters &
  ScopeKeyParameter

export function getAccountResourcesQueryOptions<config extends Config,>(
  config: config,
  options: GetAccountResourcesOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getAccountResources<config>(
        config,
        parameters,
      ) as Promise<GetAccountResourcesData>
    },
    queryKey: getAccountResourcesQueryKey(options),
  } as const satisfies QueryOptions<
    GetAccountResourcesQueryFnData,
    GetAccountResourcesErrorType,
    GetAccountResourcesData,
    GetAccountResourcesQueryKey
  >
}

export type GetAccountResourcesQueryFnData = GetAccountResourcesReturnType

export type GetAccountResourcesData = GetAccountResourcesQueryFnData

export function getAccountResourcesQueryKey(
  options: GetAccountResourcesOptions = {} as any,
) {
  return ['getAccountResources', filterQueryOptions(options)] as const
}

export type GetAccountResourcesQueryKey = ReturnType<
  typeof getAccountResourcesQueryKey
>
