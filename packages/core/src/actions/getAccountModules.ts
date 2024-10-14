import {
  type AccountAddressInput,
  type LedgerVersionArg,
  type MoveModuleBytecode,
  type PaginationArgs,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountModulesParameters = {
  accountAddress: AccountAddressInput
  options?: PaginationArgs & LedgerVersionArg
}

export type GetAccountModulesReturnType = MoveModuleBytecode[]

export type GetAccountModulesErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountModules */
export async function getAccountModules<config extends Config,>(
  config: config,
  parameters: GetAccountModulesParameters,
): Promise<GetAccountModulesReturnType> {
  const { accountAddress, options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountModules({
    accountAddress,
    options,
  })

  return response
}
