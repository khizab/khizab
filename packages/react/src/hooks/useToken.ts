'use client'

import type { Config, ResolvedRegister } from '@khizab/core'
import { type Evaluate } from '@khizab/core/internal'
import {
  type GetTokenData,
  type GetTokenOptions,
  type GetTokenQueryFnData,
  type GetTokenQueryKey,
  getTokenQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseTokenParameters<
  config extends Config = Config,
  selectData = GetTokenData,
> = Evaluate<
  GetTokenOptions &
    ConfigParameter<config> &
    QueryParameter<GetTokenQueryFnData, null, selectData, GetTokenQueryKey>
>

export type UseTokenReturnType<selectData = GetTokenData> = UseQueryReturnType<
  selectData,
  null
>

export function useToken<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTokenData,
>(
  parameters: UseTokenParameters<config, selectData> = {},
): UseTokenReturnType<selectData> {
  const { coinType, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getTokenQueryOptions(config, {
    ...parameters,
  })
  const enabled = Boolean(coinType && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
