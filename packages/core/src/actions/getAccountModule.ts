import {
  type AccountAddressInput,
  type LedgerVersionArg,
  type MoveModuleBytecode,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import { getClient } from './getClient.js'
import {
  ClientNotFoundError,
  type ClientNotFoundErrorType,
} from '../errors/config.js'

export type GetAccountModuleParameters = {
  accountAddress: AccountAddressInput
  moduleName: string
  options?: LedgerVersionArg
}

export type GetAccountModuleReturnType = MoveModuleBytecode

export type GetAccountModuleErrorType =
  | ClientNotFoundErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/getAccountModule */
export async function getAccountModule<config extends Config,>(
  config: config,
  parameters: GetAccountModuleParameters,
): Promise<GetAccountModuleReturnType> {
  const { accountAddress, moduleName, options } = parameters
  const client = getClient(config)

  if (!client) throw new ClientNotFoundError()

  const response = await client.getAccountModule({
    accountAddress,
    moduleName,
    options,
  })

  return response
}
