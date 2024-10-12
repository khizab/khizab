import {
  type AccountAddressInput,
  type LedgerVersionArg,
  type MoveResource,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountResourceParameters = {
  accountAddress: AccountAddressInput
  resourceType: `${string}::${string}::${string}`
  options?: LedgerVersionArg | undefined
}

export type GetAccountResourceReturnType = MoveResource[]

export type GetAccountResourceErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountResource */
export async function getAccountResource<config extends Config,>(
  config: config,
  parameters: GetAccountResourceParameters,
): Promise<GetAccountResourceReturnType> {
  const { accountAddress, resourceType, options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountResource({
    accountAddress,
    resourceType,
    options,
  })

  return response
}
