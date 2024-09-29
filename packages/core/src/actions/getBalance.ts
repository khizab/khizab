import { APTOS_COIN, type MoveFunctionId } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'
import { formatUnits } from '../utils/formatUnits.js'
import { getToken } from './getToken.js'

export type GetBalanceParameters<config extends Config = Config> = Evaluate<
  ChainIdParameter<config> & {
    accountAddress: `0x${string}`
    coinType?: MoveFunctionId
  }
>

export type GetBalanceReturnType = {
  decimals: number
  formatted: string
  symbol: string
  value: number
}

export type GetBalanceErrorType = {}

/** https://khizab.sh/core/api/actions/getBalance */
export async function getBalance<config extends Config>(
  config: config,
  parameters: GetBalanceParameters<config>,
): Promise<GetBalanceReturnType> {
  const { accountAddress, coinType, chainId } = parameters
  console.log('getBalance', { accountAddress, coinType, chainId })
  try {
    return await getTokenBalance(config, {
      accountAddress,
      chainId,
      coinType,
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

type GetTokenBalanceParameters = {
  chainId?: number | undefined
  coinType?: MoveFunctionId
  accountAddress: `0x${string}`
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
