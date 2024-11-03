'use client'

import {
  type Config,
  type GetAccountInfoErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionCompute } from '@khizab/core/internal'
import {
  type GetAccountInfoData,
  type GetAccountInfoOptions,
  type GetAccountInfoQueryFnData,
  type GetAccountInfoQueryKey,
  getAccountInfoQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseAccountInfoParameters<
  config extends Config = Config,
  selectData = GetAccountInfoData,
> = UnionCompute<
  GetAccountInfoOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountInfoQueryFnData,
      GetAccountInfoErrorType,
      selectData,
      GetAccountInfoQueryKey
    >
>

export type UseAccountInfoReturnType<selectData = GetAccountInfoData,> =
  UseQueryReturnType<selectData, GetAccountInfoErrorType>

/** https://khizab.dev/react/api/hooks/useAccountInfo */
export function useAccountInfo<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountInfoData,
>(
  parameters: UseAccountInfoParameters<config, selectData> = {} as any,
): UseAccountInfoReturnType<selectData> {
  const { accountAddress, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountInfoQueryOptions<config>(config, {
    ...(parameters as any),
  })
  const enabled = Boolean(accountAddress && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
