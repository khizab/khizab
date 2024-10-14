import { type QueryOptions } from '@tanstack/query-core'

import {
  type GetTransactionErrorType,
  type GetTransactionParameters,
  type GetTransactionReturnType,
  getTransaction,
} from '../actions/getTransaction.js'
import { type Config } from '../createConfig.js'
import { type ScopeKeyParameter } from '../types/properties.js'
import { filterQueryOptions } from './utils.js'
import type { AnyNumber, HexInput } from '@aptos-labs/ts-sdk'

export type GetTransactionOptions<
  transactionHashOrVersion extends HexInput | AnyNumber,
> = GetTransactionParameters<transactionHashOrVersion> & ScopeKeyParameter

export function getTransactionQueryOptions<
  config extends Config,
  transactionHashOrVersion extends HexInput | AnyNumber,
>(
  config: config,
  options: GetTransactionOptions<transactionHashOrVersion> = {} as any,
) {
  return {
    async queryFn({ queryKey }) {
      const parameters = queryKey[1]

      return getTransaction<config, transactionHashOrVersion>(
        config,
        parameters,
      ) as Promise<GetTransactionData>
    },
    queryKey: getTransactionQueryKey(options),
  } as const satisfies QueryOptions<
    GetTransactionQueryFnData,
    GetTransactionErrorType,
    GetTransactionData,
    GetTransactionQueryKey<transactionHashOrVersion>
  >
}

export type GetTransactionQueryFnData = GetTransactionReturnType

export type GetTransactionData = GetTransactionQueryFnData

export function getTransactionQueryKey<
  transactionHashOrVersion extends HexInput | AnyNumber,
>(options: GetTransactionOptions<transactionHashOrVersion> = {} as any) {
  return ['getTransaction', filterQueryOptions(options)] as const
}

export type GetTransactionQueryKey<
  transactionHashOrVersion extends HexInput | AnyNumber,
> = ReturnType<typeof getTransactionQueryKey<transactionHashOrVersion>>
