import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetLedgerInfoErrorType,
  type GetLedgerInfoParameters,
  type GetLedgerInfoReturnType,
  getLedgerInfo,
} from '../actions/getLedgerInfo.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'

export type GetLedgerInfoOptions = GetLedgerInfoParameters & ScopeKeyParameter

export function getLedgerInfoQueryOptions<config extends Config,>(
  config: config,
) {
  return {
    async queryFn() {
      return getLedgerInfo<config>(config) as Promise<GetLedgerInfoData>
    },
    queryKey: getLedgerInfoQueryKey(),
  } as const satisfies QueryOptions<
    GetLedgerInfoQueryFnData,
    GetLedgerInfoErrorType,
    GetLedgerInfoData,
    GetLedgerInfoQueryKey
  >
}

export type GetLedgerInfoQueryFnData = GetLedgerInfoReturnType

export type GetLedgerInfoData = GetLedgerInfoQueryFnData

export function getLedgerInfoQueryKey() {
  return ['getLedgerInfo'] as const
}

export type GetLedgerInfoQueryKey = ReturnType<typeof getLedgerInfoQueryKey>
