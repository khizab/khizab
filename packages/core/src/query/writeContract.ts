import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type WriteContractErrorType,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../types/abi.js'

export function writeContractMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables)
    },
    mutationKey: ['writeContract'],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractErrorType,
    WriteContractVariables<Abi, never, never>
  >
}

export type WriteContractData = Compute<WriteContractReturnType>

export type WriteContractVariables<
  abi extends Abi,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
> = WriteContractParameters<abi, functionName, args>

export type WriteContractMutate = <
  const abi extends Abi,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
>(
  variables: WriteContractVariables<abi, functionName, args>,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<abi, functionName, args>
      >
    | undefined,
) => void

export type WriteContractMutateAsync<context = unknown,> = <
  const abi extends Abi,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
>(
  variables: WriteContractVariables<abi, functionName, args>,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<abi, functionName, args>,
        context
      >
    | undefined,
) => Promise<WriteContractData>
