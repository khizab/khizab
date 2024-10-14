'use client'

import {
  type Abi,
  type AbiViewFunctionNames,
  type Config,
  type InferAbiFunctionParams,
  type WriteContractErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type WriteContractData,
  type WriteContractOptions,
  type WriteContractQueryFnData,
  type WriteContractQueryKey,
  writeContractQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWriteContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<
    abi,
    functionName
  > = InferAbiFunctionParams<abi, functionName>,
  config extends Config = Config,
  selectData = WriteContractData,
> = UnionEvaluate<
  WriteContractOptions<abi, functionName, args> &
    ConfigParameter<config> &
    QueryParameter<
      WriteContractQueryFnData,
      WriteContractErrorType,
      selectData,
      WriteContractQueryKey<abi, functionName, args>
    >
>

export type UseWriteContractReturnType<selectData = WriteContractData,> =
  UseQueryReturnType<selectData, WriteContractErrorType>

/** https://khizab.dev/react/api/hooks/useWriteContract */
export function useWriteContract<
  const abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = WriteContractData,
>(
  parameters: UseWriteContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as any,
): UseWriteContractReturnType<selectData> {
  const { functionName, query = {} } = parameters

  const config = useConfig(parameters)

  const options = writeContractQueryOptions<config, abi, functionName, args>(
    config,
    { ...(parameters as any) },
  )
  const enabled = Boolean(functionName && (query.enabled ?? true))

  return useQuery({
    ...query,
    ...options,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
