import { type QueryOptions } from '@tanstack/query-core'

import {
  type WriteContractErrorType,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { type UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../types/abi.js'

export type WriteContractOptions<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
> = UnionPartial<WriteContractParameters<abi, functionName, args>> &
  ScopeKeyParameter

export function writeContractQueryOptions<
  config extends Config,
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true> = AbiFunctionNames<
    abi,
    true
  >,
  args extends InferAbiFunctionParams<
    abi,
    functionName,
    true
  > = InferAbiFunctionParams<abi, functionName, true>,
>(
  config: config,
  options: WriteContractOptions<abi, functionName, args> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const abi = options.abi as Abi
      if (!abi) throw new Error('abi is required')
      const { functionName, scopeKey: _, ...parameters } = queryKey[1]
      if (!functionName) throw new Error('functionName is required')
      const args = parameters.args

      return writeContract<config, abi, functionName, args>(config, {
        abi: abi as any,
        functionName,
        args: args as any,
        ...parameters,
      }) as Promise<WriteContractData>
    },
    queryKey: writeContractQueryKey(options),
  } as const satisfies QueryOptions<
    WriteContractQueryFnData,
    WriteContractErrorType,
    WriteContractData,
    WriteContractQueryKey<abi, functionName, args>
  >
}

export type WriteContractQueryFnData = WriteContractReturnType

export type WriteContractData = WriteContractQueryFnData

export function writeContractQueryKey<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
>(options: WriteContractOptions<abi, functionName, args> = {} as any) {
  const { abi: _, ...rest } = options
  return ['writeContract', filterQueryOptions(rest)] as const
}

export type WriteContractQueryKey<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
> = ReturnType<typeof writeContractQueryKey<abi, functionName, args>>
