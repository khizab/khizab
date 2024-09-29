import type { Aptos } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'

export type GetClientReturnType = Aptos | undefined

export function getClient<config extends Config,>(
  config: config,
): GetClientReturnType {
  let client = undefined
  try {
    client = config.getClient()
  } catch {}
  return client as GetClientReturnType
}
