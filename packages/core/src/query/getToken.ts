import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTokenParameters,
  type GetTokenReturnType,
  getToken,
} from '../actions/getToken.js'
import { type Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetTokenOptions = Compute<
  ExactPartial<GetTokenParameters> & ScopeKeyParameter
>

export function getTokenQueryOptions<config extends Config>(
  config: config,
  options: GetTokenOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { coinType, scopeKey: _, ...parameters } = queryKey[1]
      if (!coinType) throw new Error('coinType is required')
      return getToken(config, { ...parameters, coinType })
    },
    queryKey: getTokenQueryKey(options),
  } as const satisfies QueryOptions<
    GetTokenQueryFnData,
    Error,
    GetTokenData,
    GetTokenQueryKey
  >
}

export type GetTokenQueryFnData = GetTokenReturnType

export type GetTokenData = GetTokenQueryFnData

export function getTokenQueryKey(options: GetTokenOptions = {}) {
  return ['token', filterQueryOptions(options)] as const
}

export type GetTokenQueryKey = ReturnType<typeof getTokenQueryKey>
