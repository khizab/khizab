import type { MutateOptions } from '@tanstack/react-query'
import type {
  Abi,
  AbiFunctionNames,
  Config,
  InferAbiFunctionParams,
  ResolvedRegister,
  WriteContractErrorType,
} from '@khizab/core'
import type {
  Compute,
  ConnectorParameter,
  UnionCompute,
} from '@khizab/core/internal'
import type {
  WriteContractData,
  WriteContractVariables,
} from '@khizab/core/query'
import { useCallback } from 'react'

import {
  type UseWriteContractParameters,
  useWriteContract,
  type UseWriteContractReturnType as wagmi_UseWriteContractReturnType,
  type UseWriteContractReturnType,
} from '../useWriteContract.js'

export type CreateUseWriteContractParameters<
  abi extends Abi,
  functionName extends AbiFunctionNames<abi, true> | undefined = undefined,
> = {
  abi: abi | Abi
  functionName?: functionName | AbiFunctionNames<abi, true> | undefined
}

export type CreateUseWriteContractReturnType<
  abi extends Abi,
  functionName extends AbiFunctionNames<abi, true> | undefined,
> = <config extends Config = ResolvedRegister['config'], context = unknown>(
  parameters?: UseWriteContractParameters<config, context>,
) => Compute<
  Omit<
    UseWriteContractReturnType<context>,
    'writeContract' | 'writeContractAsync'
  > & {
    writeContract: <
      const abi2 extends abi,
      name extends functionName extends AbiFunctionNames<abi, true>
        ? functionName
        : AbiFunctionNames<abi, true>,
      args extends InferAbiFunctionParams<abi2, name, true>,
    >(
      variables: Variables<abi2, functionName, name, args>,
      options?:
        | MutateOptions<
            WriteContractData,
            WriteContractErrorType,
            WriteContractVariables<abi2, name, args>,
            context
          >
        | undefined,
    ) => void
    writeContractAsync: <
      const abi2 extends abi,
      name extends functionName extends AbiFunctionNames<abi, true>
        ? functionName
        : AbiFunctionNames<abi, true>,
      args extends InferAbiFunctionParams<abi2, name, true>,
    >(
      variables: Variables<abi2, functionName, name, args, config>,
      options?:
        | MutateOptions<
            WriteContractData,
            WriteContractErrorType,
            WriteContractVariables<abi2, name, args>,
            context
          >
        | undefined,
    ) => Promise<WriteContractData>
  }
>

export function createUseWriteContract<
  const abi extends Abi,
  functionName extends AbiFunctionNames<abi, true> | undefined = undefined,
>(
  props: CreateUseWriteContractParameters<abi, functionName>,
): CreateUseWriteContractReturnType<abi, functionName> {
  return (parameters) => {
    const result = useWriteContract(parameters)
    type Args = Parameters<wagmi_UseWriteContractReturnType['writeContract']>
    return {
      ...(result as any),
      writeContract: useCallback(
        (...args: Args) => {
          const variables = {
            ...(args[0] as any),
            ...(props.functionName ? { functionName: props.functionName } : {}),
            abi: props.abi,
          }
          result.writeContract(variables, args[1] as any)
        },
        [props, result.writeContract],
      ),
      writeContractAsync: useCallback(
        (...args: Args) => {
          const variables = {
            ...(args[0] as any),
            ...(props.functionName ? { functionName: props.functionName } : {}),
            abi: props.abi,
          }
          return result.writeContractAsync(variables, args[1] as any)
        },
        [props, result.writeContractAsync],
      ),
    }
  }
}

type Variables<
  abi extends Abi,
  functionName extends AbiFunctionNames<abi, true> | undefined,
  name extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, name, true>,
  allFunctionNames = AbiFunctionNames<abi, true>,
  omittedProperties extends 'abi' | 'functionName' =
    | 'abi'
    | (functionName extends undefined ? never : 'functionName'),
> = UnionCompute<
  {
    abi: abi
    name: name
    args: args
    allFunctionNames: allFunctionNames
  } & omittedProperties &
    ConnectorParameter & { __mode?: 'prepared' }
>
