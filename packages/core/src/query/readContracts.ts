import type { QueryOptions } from '@tanstack/query-core'

import {
  type ReadContractsErrorType,
  type ReadContractsReturnType,
  readContracts,
} from '../actions/readContracts.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'
import type { Abi, AbiFunctionNames } from '../types/abi.js'
import type { ReadContractParameters } from '../actions/readContract.js'

export type ReadContractsOptions<
  abi extends Abi | undefined,
  F extends AbiFunctionNames<abi>,
  payloads extends readonly Exclude<
    ReadContractParameters<abi, F>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<abi, F>, 'abi'>[],
  allowFailure extends boolean = boolean,
> = {
  abi: abi
  payloads: payloads
  allowFailure: allowFailure
} & ScopeKeyParameter

export function readContractsQueryOptions<
  config extends Config,
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
  payloads extends readonly Exclude<
    ReadContractParameters<T, F>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<T, F>, 'abi'>[],
  allowFailure extends boolean = true,
>(config: config, options: ReadContractsOptions<T, F, payloads, allowFailure>) {
  return {
    async queryFn({ queryKey }) {
      const payloads: Exclude<ReadContractParameters<T, F>, 'abi'>[] = []
      const length = queryKey[1].payloads.length
      for (let i = 0; i < length; i++) {
        const payload = queryKey[1].payloads[i]!
        const abi = options.payloads?.[i]?.abi
        payloads.push({ ...payload, abi })
      }
      const { scopeKey: _, ...parameters } = queryKey[1]

      return readContracts(config, {
        ...parameters,
        payloads,
      }) as Promise<ReadContractsReturnType<T, F>>
    },
    queryKey: readContractsQueryKey(options),
  } as const satisfies QueryOptions<
    ReadContractsQueryFnData<T, F>,
    ReadContractsErrorType,
    ReadContractsData<T, F>,
    ReadContractsQueryKey<T, F>
  >
}

export type ReadContractsQueryFnData<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
> = ReadContractsReturnType<T, F>

export type ReadContractsData<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
> = ReadContractsQueryFnData<T, F>

export function readContractsQueryKey<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
>(options: ReadContractsOptions<T, F>) {
  const payloads = []
  for (const payload of options.payloads) {
    payloads.push({ ...payload, abi: options.abi })
  }
  return [
    'readContracts',
    filterQueryOptions({ ...options, payloads }),
  ] as const
}

export type ReadContractsQueryKey<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
> = ReturnType<typeof readContractsQueryKey<T, F>>
