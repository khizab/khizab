import {
  type Config,
  type Abi,
  type AbiFunctionNames,
  type WriteContractErrorType,
  type WriteContractParameters,
  type ResolvedRegister,
  type InferAbiFunctionParams,
} from '@khizab/core'
import {
  type ScopeKeyParameter,
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '@khizab/core/internal'
import {
  type WriteContractData,
  type WriteContractQueryFnData,
  type WriteContractQueryKey,
} from '@khizab/core/query'

import {
  type ConfigParameter,
  type QueryParameter,
} from '../../types/properties.js'
import {
  type UseWriteContractReturnType,
  useWriteContract,
} from '../useWriteContract.js'

export type CreateUseWriteContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined = undefined,
> = {
  abi: abi | Abi | undefined
  functionName?: functionName | AbiFunctionNames<abi> | undefined
}

export type CreateUseWriteContractReturnType<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined,
  ///
  omittedProperties extends 'abi' | 'functionName' =
    | 'abi'
    | (functionName extends undefined ? never : 'functionName'),
> = <
  name extends functionName extends AbiFunctionNames<abi>
    ? functionName
    : AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, name>,
  config extends Config = ResolvedRegister['config'],
  selectData = WriteContractData,
>(
  parameters?: UnionEvaluate<
    UnionPartial<
      UnionOmit<WriteContractParameters<abi, name, args>, omittedProperties>
    > &
      ScopeKeyParameter &
      ConfigParameter<config> &
      QueryParameter<
        WriteContractQueryFnData,
        WriteContractErrorType,
        selectData,
        WriteContractQueryKey<abi, name, args>
      >
  >,
) => UseWriteContractReturnType<selectData>

export function createUseWriteContract<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined = undefined,
>(
  config: CreateUseWriteContractParameters<abi, functionName>,
): CreateUseWriteContractReturnType<abi, functionName> {
  return (parameters) => {
    return useWriteContract({
      ...(parameters as any),
      ...(config.functionName ? { functionName: config.functionName } : {}),
      abi: config.abi,
    })
  }
}
