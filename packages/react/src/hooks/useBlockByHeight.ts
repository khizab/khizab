'use client'

import { type Config, type ResolvedRegister } from '@khizab/core'
import { type Compute } from '@khizab/core/internal'
import {
  type GetBlockByHeightData,
  type GetBlockByHeightOptions,
  type GetBlockByHeightQueryFnData,
  type GetBlockByHeightQueryKey,
  getBlockByHeightQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseBlockByHeightParameters<
  config extends Config = Config,
  selectData = GetBlockByHeightData,
> = Compute<
  GetBlockByHeightOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetBlockByHeightQueryFnData,
      null,
      selectData,
      GetBlockByHeightQueryKey
    >
>

export type UseBlockByHeightReturnType<selectData = GetBlockByHeightData> =
  UseQueryReturnType<selectData, null>

/** https://khizab.dev/react/hooks/useBlock */
export function useBlockByHeight<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBlockByHeightData,
>(
  parameters: UseBlockByHeightParameters<config, selectData> = {},
): UseBlockByHeightReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)

  const options = getBlockByHeightQueryOptions(config, parameters)
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({
    ...(query as any),
    ...options,
    enabled,
  }) as UseBlockByHeightReturnType<selectData>
}
