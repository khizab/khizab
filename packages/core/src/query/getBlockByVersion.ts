import { type QueryOptions } from '@tanstack/query-core'

import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'
import {
  GetBlockByVersion,
  type GetBlockByVersionParameters,
  type GetBlockByVersionReturnType,
} from '../actions/getBlockByVersion.js'

export type GetBlockByVersionOptions = Compute<
  ExactPartial<GetBlockByVersionParameters> & ScopeKeyParameter
>

export function getBlockByVersionQueryOptions<config extends Config>(
  config: config,
  options: GetBlockByVersionOptions = {},
) {
  return {
    gcTime: 0,
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters }: any = queryKey[1]
      const blockNumber = await GetBlockByVersion(config, parameters)
      return blockNumber ?? null
    },
    queryKey: getBlockByVersionQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlockByVersionQueryFnData,
    GetBlockByVersionData,
    GetBlockByVersionQueryKey
  >
}

export type GetBlockByVersionQueryFnData = GetBlockByVersionReturnType

export type GetBlockByVersionData = GetBlockByVersionQueryFnData

export function getBlockByVersionQueryKey(
  options: GetBlockByVersionOptions = {},
) {
  return ['blockNumber', filterQueryOptions(options)] as const
}

export type GetBlockByVersionQueryKey = ReturnType<
  typeof getBlockByVersionQueryKey
>
