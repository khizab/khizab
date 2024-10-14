import { BaseError } from './base.js'

export type TransactionNotFoundErrorType = TransactionNotFoundError & {
  name: 'TransactionNotFoundError'
}
export class TransactionNotFoundError extends BaseError {
  override name = 'TransactionNotFoundError'
  constructor() {
    super('Transaction not found.')
  }
}

export type GetTransactionPayloadErrorType = GetTransactionPayloadError & {
  name: 'GetTransactionPayloadError'
}
export class GetTransactionPayloadError extends BaseError {
  override name = 'GetTransactionPayloadError'
  constructor() {
    super('cannot parse payload')
  }
}
