import { type MoveFunctionId } from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'
import { readContracts } from './readContracts.js'

export type GetTokenParameters = {
  coinType: MoveFunctionId
}

export type GetTokenReturnType = {
  coinType: MoveFunctionId
  decimals: number
  name: string
  symbol: string
  supply: string
}

export async function getToken<config extends Config>(
  config: config,
  parameters: GetTokenParameters,
): Promise<GetTokenReturnType> {
  const { coinType } = parameters

  try {
    const [name, symbol, decimals, _supply] = await readContracts(config, {
      payloads: [
        {
          functionName: '0x1::coin::name',
          args: [],
          typeArguments: [coinType],
        },
        {
          functionName: '0x1::coin::symbol',
          args: [],
          typeArguments: [coinType],
        },
        {
          functionName: '0x1::coin::decimals',
          args: [],
          typeArguments: [coinType],
        },
        {
          functionName: '0x1::coin::supply',
          args: [],
          typeArguments: [coinType],
        },
      ],
    })

    // handle errors
    if (!name) throw new Error("Failed to fetch token's name")
    if (!symbol) throw new Error("Failed to fetch token's symbol")
    if (!decimals) throw new Error("Failed to fetch token's decimals")
    if (!_supply) throw new Error("Failed to fetch token's total supply")

    const supply = (_supply[0] as { vec: [string] }).vec[0]

    return {
      coinType,
      decimals: decimals[0] as number,
      name: name[0] as string,
      symbol: symbol[0] as string,
      supply,
    }
  } catch (error: any) {
    console.log('error in getToken', error)

    throw new Error(error)
  }
}
