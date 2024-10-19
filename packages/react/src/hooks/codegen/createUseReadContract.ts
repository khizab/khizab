import {
  type Config,
  type Abi,
  type AbiFunctionNames,
  type ReadContractErrorType,
  type ReadContractParameters,
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
  type ReadContractData,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
} from '@khizab/core/query'

import {
  type ConfigParameter,
  type QueryParameter,
} from '../../types/properties.js'
import {
  type UseReadContractReturnType,
  useReadContract,
} from '../useReadContract.js'

export type CreateUseReadContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined = undefined,
> = {
  abi: abi | Abi | undefined
  functionName?: functionName | AbiFunctionNames<abi> | undefined
}

export type CreateUseReadContractReturnType<
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
  selectData = ReadContractData<abi, name>,
>(
  parameters?: UnionEvaluate<
    UnionPartial<
      UnionOmit<ReadContractParameters<abi, name, args>, omittedProperties>
    > &
      ScopeKeyParameter &
      ConfigParameter<config> &
      QueryParameter<
        ReadContractQueryFnData<abi, name>,
        ReadContractErrorType,
        selectData,
        ReadContractQueryKey<abi, name, args>
      >
  >,
) => UseReadContractReturnType<abi, name, selectData>

export function createUseReadContract<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined = undefined,
>(
  config: CreateUseReadContractParameters<abi, functionName>,
): CreateUseReadContractReturnType<abi, functionName> {
  return (parameters) => {
    return useReadContract({
      ...(parameters as any),
      ...(config.functionName ? { functionName: config.functionName } : {}),
      abi: config.abi,
    })
  }
}
