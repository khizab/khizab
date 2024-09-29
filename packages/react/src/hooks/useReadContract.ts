'use client'

import {
  type Abi,
  type AbiViewFunctionNames,
  type Config,
  type InferAbiFunctionParams,
  type ReadContractErrorType,
  type ResolvedRegister,
} from '@khizab/core'
import { type UnionEvaluate } from '@khizab/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@khizab/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseReadContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<
    abi,
    functionName
  > = InferAbiFunctionParams<abi, functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName>,
> = UnionEvaluate<
  ReadContractOptions<abi, functionName, args> &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractQueryFnData<abi, functionName>,
      ReadContractErrorType,
      selectData,
      ReadContractQueryKey<abi, functionName, args>
    >
>

export type UseReadContractReturnType<
  abi extends Abi | undefined = Abi,
  functionName extends AbiViewFunctionNames<abi> = AbiViewFunctionNames<abi>,
  selectData = ReadContractData<abi, functionName>,
> = UseQueryReturnType<selectData, ReadContractErrorType>

/** https://khizab.dev/react/api/hooks/useReadContract */
export function useReadContract<
  const abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName>,
>(
  parameters: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as any,
): UseReadContractReturnType<abi, functionName, selectData> {
  const { functionName, query = {} } = parameters

  const config = useConfig(parameters)

  const options = readContractQueryOptions<config, abi, functionName, args>(
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
