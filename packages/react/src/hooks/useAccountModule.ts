'use client'

import {
  type Config,
  type GetAccountModuleErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionCompute } from '@khizab/core/internal'
import {
  type GetAccountModuleData,
  type GetAccountModuleOptions,
  type GetAccountModuleQueryFnData,
  type GetAccountModuleQueryKey,
  getAccountModuleQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseAccountModuleParameters<
  config extends Config = Config,
  selectData = GetAccountModuleData,
> = UnionCompute<
  GetAccountModuleOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetAccountModuleQueryFnData,
      GetAccountModuleErrorType,
      selectData,
      GetAccountModuleQueryKey
    >
>

export type UseAccountModuleReturnType<selectData = GetAccountModuleData,> =
  UseQueryReturnType<selectData, GetAccountModuleErrorType>

/** https://khizab.dev/react/api/hooks/useAccountModule */
export function useAccountModule<
  config extends Config = ResolvedRegister['config'],
  selectData = GetAccountModuleData,
>(
  parameters: UseAccountModuleParameters<config, selectData> = {} as any,
): UseAccountModuleReturnType<selectData> {
  const { accountAddress, moduleName, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getAccountModuleQueryOptions<config>(config, {
    ...(parameters as any),
  })
  const enabled = Boolean(
    accountAddress && moduleName && (query.enabled ?? true),
  )

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
