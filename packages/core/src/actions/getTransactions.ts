import {
  type PaginationArgs,
  type TransactionResponse,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import { type TransactionNotFoundErrorType } from '../errors/transaction.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetTransactionsParameters = {
  options: PaginationArgs
}

export type GetTransactionsReturnType = TransactionResponse[]

export type GetTransactionsErrorType =
  | TransactionNotFoundErrorType
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getTransactions */
export async function getTransactions<config extends Config,>(
  config: config,
  parameters: GetTransactionsParameters,
): Promise<GetTransactionsReturnType> {
  const { options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  return await client.getTransactions({
    options,
  })
}
