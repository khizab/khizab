import type { AnyNumber, Block } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'

export type GetBlockByVersionParameters = {
  version: AnyNumber
  withTransactions: boolean
}

export type GetBlockByVersionReturnType = Block

/** https://khizab.dev/core/actions/GetBlockByVersion */
export async function GetBlockByVersion<config extends Config>(
  config: config,
  parameters: GetBlockByVersionParameters,
): Promise<GetBlockByVersionReturnType> {
  const { version, withTransactions } = parameters

  const client = config.getClient()
  const action = await client.getBlockByVersion({
    ledgerVersion: version,
    options: { withTransactions },
  })

  return action
}
