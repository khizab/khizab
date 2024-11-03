'use client'

import {
  type Config,
  type GetLedgerInfoErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionCompute } from '@khizab/core/internal'
import {
  type GetLedgerInfoData,
  type GetLedgerInfoQueryFnData,
  type GetLedgerInfoQueryKey,
  getLedgerInfoQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseLedgerInfoParameters<
  config extends Config = Config,
  selectData = GetLedgerInfoData,
> = UnionCompute<
  GetLedgerInfoData &
    ConfigParameter<config> &
    QueryParameter<
      GetLedgerInfoQueryFnData,
      GetLedgerInfoErrorType,
      selectData,
      GetLedgerInfoQueryKey
    >
>

export type UseLedgerInfoReturnType<selectData = GetLedgerInfoData,> =
  UseQueryReturnType<selectData, GetLedgerInfoErrorType>

/** https://khizab.dev/react/api/hooks/useLedgerInfo */
export function useLedgerInfo<
  config extends Config = ResolvedRegister['config'],
  selectData = GetLedgerInfoData,
>(
  parameters: UseLedgerInfoParameters<config, selectData> = {} as any,
): UseLedgerInfoReturnType<selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)

  const options = getLedgerInfoQueryOptions<config>(config)
  const enabled = Boolean(query.enabled ?? true)

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
