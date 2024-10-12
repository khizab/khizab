import {
  type AccountAddressInput,
  type LedgerVersionArg,
  type MoveResource,
  type PaginationArgs,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountResourcesParameters = {
  accountAddress: AccountAddressInput
  options?: PaginationArgs & LedgerVersionArg
}

export type GetAccountResourcesReturnType = MoveResource[]

export type GetAccountResourcesErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountResources */
export async function getAccountResources<config extends Config,>(
  config: config,
  parameters: GetAccountResourcesParameters,
): Promise<GetAccountResourcesReturnType> {
  const { accountAddress, options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountResources({
    accountAddress,
    options,
  })

  return response
}
