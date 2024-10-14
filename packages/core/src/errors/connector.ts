import type { Connector } from '../createConfig.js'
import { BaseError } from './base.js'

export interface AptosWalletErrorResult {
  code: number
  name: string
  message: string
}
// Type Guard for AptosWalletErrorResult
export function isAptosWalletErrorResult(
  result: any,
): result is AptosWalletErrorResult {
  return typeof result === 'object' && 'code' in result && 'name' in result
}

export type ProviderNotFoundErrorType = ProviderNotFoundError & {
  name: 'ProviderNotFoundError'
}
export class ProviderNotFoundError extends BaseError {
  override name = 'ProviderNotFoundError'
  constructor() {
    super('Provider not found.')
  }
}

export type SwitchChainNotSupportedErrorType = SwitchChainNotSupportedError & {
  name: 'SwitchChainNotSupportedError'
}
export class SwitchChainNotSupportedError extends BaseError {
  override name = 'SwitchChainNotSupportedError'

  constructor({ connector }: { connector: Connector }) {
    super(`"${connector.name}" does not support programmatic chain switching.`)
  }
}
