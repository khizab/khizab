import { APTOS_COIN, type MoveFunctionId } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'
import { type Compute } from '../types/utils.js'
import { formatUnits } from '../utils/formatUnits.js'
import { getToken } from './getToken.js'

export type GetBalanceParameters = Compute<{
  accountAddress?: string
  coinType?: MoveFunctionId
}>

export type GetBalanceReturnType =
  | {
      decimals: number
      formatted: string
      symbol: string
      value: number
    }
  | undefined

export type GetBalanceErrorType = {}

/** https://khizab.dev/core/api/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  parameters: GetBalanceParameters,
): Promise<GetBalanceReturnType> {
  const { accountAddress, coinType } = parameters
  if (!accountAddress) return

  try {
    return await getTokenBalance(config, {
      accountAddress,
      coinType,
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

type GetTokenBalanceParameters = {
  coinType?: MoveFunctionId
  accountAddress: string
}

async function getTokenBalance(
  config: Config,
  parameters: GetTokenBalanceParameters,
) {
  const { coinType: _coinType, accountAddress } = parameters
  const client = config.getClient()

  const { coinType, decimals, name, symbol } = await getToken(config, {
    coinType: _coinType ?? APTOS_COIN,
  })

  const value = await client.getAccountCoinAmount({
    accountAddress,
    coinType,
  })

  const formatted = formatUnits(value ?? '0', decimals)
  return { name, decimals, symbol, value, formatted }
}
