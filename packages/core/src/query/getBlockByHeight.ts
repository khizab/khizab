import { type QueryOptions } from '@tanstack/query-core'

import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'
import {
  GetBlockByHeight,
  type GetBlockByHeightParameters,
} from '../actions/getBlockByHeight.js'
import type { GetBlockByVersionReturnType } from '../actions/getBlockByVersion.js'

export type GetBlockByHeightOptions = Evaluate<
  ExactPartial<GetBlockByHeightParameters> & ScopeKeyParameter
>

export function getBlockByHeightQueryOptions<config extends Config>(
  config: config,
  options: GetBlockByHeightOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters }: any = queryKey[1]
      const block = await GetBlockByHeight(config, parameters)
      return (block ?? null) as any
    },
    queryKey: getBlockByHeightQueryKey(options),
  } as const satisfies QueryOptions<
    GetBlockByHeightQueryFnData,
    GetBlockByHeightData,
    GetBlockByHeightQueryKey
  >
}

export type GetBlockByHeightQueryFnData = GetBlockByVersionReturnType

export type GetBlockByHeightData = GetBlockByHeightQueryFnData

export function getBlockByHeightQueryKey(
  options: GetBlockByHeightOptions = {},
) {
  return ['block', filterQueryOptions(options)] as const
}

export type GetBlockByHeightQueryKey = ReturnType<
  typeof getBlockByHeightQueryKey
>
