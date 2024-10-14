import { type LedgerInfo } from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetLedgerInfoParameters = undefined

export type GetLedgerInfoReturnType = LedgerInfo

export type GetLedgerInfoErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getLedgerInfo */
export async function getLedgerInfo<config extends Config,>(
  config: config,
): Promise<GetLedgerInfoReturnType> {
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  return await client.getLedgerInfo()
}
