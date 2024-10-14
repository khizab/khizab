import {
  type AccountAddressInput,
  type PaginationArgs,
  type TransactionResponse,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountTransactionsParameters = {
  accountAddress: AccountAddressInput
  options?: PaginationArgs
}

export type GetAccountTransactionsReturnType = TransactionResponse[]

export type GetAccountTransactionsErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountTransactions */
export async function getAccountTransactions<config extends Config,>(
  config: config,
  parameters: GetAccountTransactionsParameters,
): Promise<GetAccountTransactionsReturnType> {
  const { accountAddress, options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountTransactions({
    accountAddress,
    options,
  })

  return response
}
