import { type AccountAddressInput, type AccountData } from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountInfoParameters = {
  accountAddress: AccountAddressInput
}

export type GetAccountInfoReturnType = AccountData

export type GetAccountInfoErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountInfo */
export async function getAccountInfo<config extends Config,>(
  config: config,
  parameters: GetAccountInfoParameters,
): Promise<GetAccountInfoReturnType> {
  const { accountAddress } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountInfo({
    accountAddress,
  })

  return response
}
