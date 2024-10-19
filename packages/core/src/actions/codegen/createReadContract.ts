import { type Config } from '../../createConfig.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../../types/abi.js'
import { type UnionEvaluate, type UnionOmit } from '../../types/utils.js'
import {
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../readContract.js'

export type CreateReadContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined,
> = {
  abi: abi | Abi
  functionName?: functionName | AbiFunctionNames<abi>
}

export type CreateReadContractReturnType<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined,
  ///
  omittedProperties extends 'abi' | 'functionName' =
    | 'abi'
    | (functionName extends undefined ? never : 'functionName'),
> = <
  config extends Config,
  name extends functionName extends AbiFunctionNames<abi>
    ? functionName
    : AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, name>,
>(
  config: config,
  parameters: UnionEvaluate<
    UnionOmit<ReadContractParameters<abi, name, args>, omittedProperties>
  >,
) => Promise<ReadContractReturnType<abi, name>>

export function createReadContract<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> | undefined = undefined,
>(
  c: CreateReadContractParameters<abi, functionName>,
): CreateReadContractReturnType<abi, functionName> {
  return (config, parameters) => {
    return readContract(config, {
      ...(parameters as any),
      ...(c.functionName ? { functionName: c.functionName } : {}),
      abi: c.abi,
    })
  }
}
