import type { AnyNumber, Block } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'

export type GetBlockByHeightParameters = {
  height: AnyNumber
  withTransactions: boolean
}

export type GetBlockByHeightReturnType = Block

/** https://khizab.dev/core/actions/GetBlockByHeight */
export async function GetBlockByHeight<config extends Config>(
  config: config,
  parameters: GetBlockByHeightParameters,
): Promise<GetBlockByHeightReturnType> {
  const { height, withTransactions } = parameters

  const client = config.getClient()
  const action = await client.getBlockByHeight({
    blockHeight: height,
    options: { withTransactions },
  })

  return action
}
