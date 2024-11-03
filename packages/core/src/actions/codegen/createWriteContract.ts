import { type Config } from '../../createConfig.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../../types/abi.js'
import { type ConnectorParameter } from '../../types/properties.js'
import { type UnionCompute } from '../../types/utils.js'
import {
  type WriteContractReturnType,
  writeContract,
  type WriteContractParameters,
} from '../writeContract.js'

export type CreateWriteContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  functionName: functionName | AbiFunctionNames<abi, true>
}

export type CreateWriteContractReturnType<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true> | undefined,
> = <
  config extends Config,
  name extends functionName extends AbiFunctionNames<abi, true>
    ? functionName
    : AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, name, true>,
>(
  config: config,
  parameters: UnionCompute<
    WriteContractParameters<abi, name, args> &
      ConnectorParameter & { __mode?: 'prepared' }
  >,
) => Promise<WriteContractReturnType>

export function createWriteContract<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true> = AbiFunctionNames<
    abi,
    true
  >,
>(
  c: CreateWriteContractParameters<abi, functionName>,
): CreateWriteContractReturnType<abi, functionName> {
  return (config, parameters) => {
    return writeContract(config, {
      ...(parameters as any),
      ...(c.functionName ? { functionName: c.functionName } : {}),
      abi: c.abi,
    })
  }
}
