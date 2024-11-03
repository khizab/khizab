'use client'

import {
  type Config,
  type GetBalanceErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import type { Compute } from '@khizab/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@khizab/core/query'
import type { GetBalanceQueryFnData } from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Compute<
  GetBalanceOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetBalanceQueryFnData,
      GetBalanceErrorType,
      selectData,
      GetBalanceQueryKey
    >
>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://khizab.dev/react/api/hooks/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: UseBalanceParameters<config, selectData> = {},
): UseBalanceReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getBalanceQueryOptions(config, {
    ...parameters,
  })
  const enabled = Boolean(accountAddress && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
