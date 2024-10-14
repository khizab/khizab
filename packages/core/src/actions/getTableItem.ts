import {
  type LedgerVersionArg,
  type TableItemRequest,
  type TransactionResponse,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetTableItemParameters = {
  handle: string
  data: TableItemRequest
  options?: LedgerVersionArg
}

export type GetTableItemReturnType = TransactionResponse

export type GetTableItemErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getTableItem */
export async function getTableItem<config extends Config,>(
  config: config,
  parameters: GetTableItemParameters,
): Promise<GetTableItemReturnType> {
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  return await client.getTableItem(parameters)
}
