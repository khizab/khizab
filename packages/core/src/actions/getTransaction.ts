import {
  type AnyNumber,
  type HexInput,
  type TransactionResponse,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import { isHexInput, isNumeric, toAnyNumber } from '../utils/types.js'
import {
  GetTransactionPayloadError,
  TransactionNotFoundError,
  type GetTransactionPayloadErrorType,
  type TransactionNotFoundErrorType,
} from '../errors/transaction.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetTransactionParameters<
  transactionHashOrVersion extends HexInput | AnyNumber,
> = {
  payload: transactionHashOrVersion
}

export type GetTransactionReturnType = TransactionResponse

export type GetTransactionErrorType =
  | TransactionNotFoundErrorType
  | GetTransactionPayloadErrorType
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getTransaction */
export async function getTransaction<
  config extends Config,
  transactionHashOrVersion extends HexInput | AnyNumber,
>(
  config: config,
  parameters: GetTransactionParameters<transactionHashOrVersion>,
): Promise<GetTransactionReturnType> {
  const { payload } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  if (isNumeric(payload)) {
    const _payload = toAnyNumber(payload)
    if (!_payload) throw new GetTransactionPayloadError()

    const response = await client.getTransactionByVersion({
      ledgerVersion: _payload,
    })
    if (!response) throw new TransactionNotFoundError()

    return response
  }

  if (!isHexInput(payload)) throw new GetTransactionPayloadError()

  const response = await client.getTransactionByHash({
    transactionHash: payload,
  })

  if (!response) throw new TransactionNotFoundError()
  return response
}
