'use client'

import {
  type Config,
  type GetTransactionErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionCompute } from '@khizab/core/internal'
import {
  type GetTransactionData,
  type GetTransactionOptions,
  type GetTransactionQueryFnData,
  type GetTransactionQueryKey,
  getTransactionQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import type { AnyNumber, HexInput } from '@aptos-labs/ts-sdk'

export type UseTransactionParameters<
  transactionHashOrVersion extends HexInput | AnyNumber,
  config extends Config = Config,
  selectData = GetTransactionData,
> = UnionCompute<
  GetTransactionOptions<transactionHashOrVersion> &
    ConfigParameter<config> &
    QueryParameter<
      GetTransactionQueryFnData,
      GetTransactionErrorType,
      selectData,
      GetTransactionQueryKey<transactionHashOrVersion>
    >
>

export type UseTransactionReturnType<selectData = GetTransactionData,> =
  UseQueryReturnType<selectData, GetTransactionErrorType>

/** https://khizab.dev/react/api/hooks/useTransaction */
export function useTransaction<
  transactionHashOrVersion extends HexInput | AnyNumber,
  config extends Config = ResolvedRegister['config'],
  selectData = GetTransactionData,
>(
  parameters: UseTransactionParameters<
    transactionHashOrVersion,
    config,
    selectData
  > = {} as any,
): UseTransactionReturnType<selectData> {
  const { payload, query = {} } = parameters

  const config = useConfig(parameters)

  const options = getTransactionQueryOptions<config, transactionHashOrVersion>(
    config,
    { ...(parameters as any) },
  )
  const enabled = Boolean(payload && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
