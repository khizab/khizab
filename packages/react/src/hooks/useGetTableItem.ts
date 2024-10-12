'use client'

import {
  type Config,
  type GetTableItemErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type GetTableItemData,
  type GetTableItemOptions,
  type GetTableItemQueryFnData,
  type GetTableItemQueryKey,
  getTableItemQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseGetTableItemParameters<
  config extends Config = Config,
  selectData = GetTableItemData,
> = UnionEvaluate<
  GetTableItemOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetTableItemQueryFnData,
      GetTableItemErrorType,
      selectData,
      GetTableItemQueryKey
    >
>

export type UseGetTableItemReturnType<selectData = GetTableItemData,> =
  UseQueryReturnType<selectData, GetTableItemErrorType>

/** https://khizab.dev/react/api/hooks/useGetTableItem */
export function useGetTableItem<
  config extends Config = ResolvedRegister['config'],
  selectData = GetTableItemData,
>(
  parameters: UseGetTableItemParameters<config, selectData> = {} as any,
): UseGetTableItemReturnType<selectData> {
  const { handle, data, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getTableItemQueryOptions<config>(config, {
    ...(parameters as any),
  })
  const enabled = Boolean(handle && data && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
