import { type QueryOptions } from '@tanstack/query-core'

import {
  type ReadContractErrorType,
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../actions/readContract.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { type UnionPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../types/abi.js'

export type ReadContractOptions<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, functionName>,
> = UnionPartial<ReadContractParameters<abi, functionName, args>> &
  ScopeKeyParameter

export function readContractQueryOptions<
  config extends Config,
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi> = AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<
    abi,
    functionName
  > = InferAbiFunctionParams<abi, functionName>,
>(
  config: config,
  options: ReadContractOptions<abi, functionName, args> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const abi = options.abi as Abi
      if (!abi) throw new Error('abi is required')
      const { functionName, scopeKey: _, ...parameters } = queryKey[1]
      if (!functionName) throw new Error('functionName is required')
      const args = parameters.args

      return readContract<config, abi, functionName, args>(config, {
        abi: abi as any,
        functionName,
        args: args as any,
        ...parameters,
      }) as Promise<ReadContractData<abi, functionName>>
    },
    queryKey: readContractQueryKey(options),
  } as const satisfies QueryOptions<
    ReadContractQueryFnData<abi, functionName>,
    ReadContractErrorType,
    ReadContractData<abi, functionName>,
    ReadContractQueryKey<abi, functionName, args>
  >
}

export type ReadContractQueryFnData<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi>,
> = ReadContractReturnType<abi, functionName>

export type ReadContractData<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi>,
> = ReadContractQueryFnData<abi, functionName>

export function readContractQueryKey<
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, functionName>,
>(options: ReadContractOptions<abi, functionName, args> = {} as any) {
  const { abi: _, ...rest } = options
  return ['readContract', filterQueryOptions(rest)] as const
}

export type ReadContractQueryKey<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi>,
  args extends InferAbiFunctionParams<abi, functionName>,
> = ReturnType<typeof readContractQueryKey<abi, functionName, args>>
