import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTableItemErrorType,
  type GetTableItemParameters,
  type GetTableItemReturnType,
  getTableItem,
} from '../actions/getTableItem.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'

export type GetTableItemOptions = GetTableItemParameters & ScopeKeyParameter

export function getTableItemQueryOptions<config extends Config,>(
  config: config,
  options: GetTableItemOptions = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getTableItem<config>(
        config,
        parameters,
      ) as Promise<GetTableItemData>
    },
    queryKey: getTableItemQueryKey(options),
  } as const satisfies QueryOptions<
    GetTableItemQueryFnData,
    GetTableItemErrorType,
    GetTableItemData,
    GetTableItemQueryKey
  >
}

export type GetTableItemQueryFnData = GetTableItemReturnType

export type GetTableItemData = GetTableItemQueryFnData

export function getTableItemQueryKey(options: GetTableItemOptions = {} as any) {
  return ['getTableItem', filterQueryOptions(options)] as const
}

export type GetTableItemQueryKey = ReturnType<typeof getTableItemQueryKey>
