import type {
  LedgerVersionArg,
  MoveFunctionId,
  MoveValue,
} from '@aptos-labs/ts-sdk'
import { type Config } from '../createConfig.js'
import type {
  Abi,
  AbiViewFunctionNames,
  InferAbiFunctionParams,
  InferAbiFunctionReturns,
} from '../types/abi.js'
import { parseAbiReturnType } from '../utils/abi.js'
import type { BaseError } from '../errors/base.js'

export type ReadContractParameters<
  abi extends Abi | undefined = Abi | undefined,
  functionName extends AbiViewFunctionNames<abi> = AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<
    abi,
    functionName
  > = InferAbiFunctionParams<abi, functionName>,
> = {
  abi?: abi
  functionName: functionName
  args: args
  typeArguments?: MoveFunctionId[] | undefined
  functionArguments?: MoveValue[] | undefined
  options?: LedgerVersionArg
}

export type ReadContractErrorType = BaseError

export type ReadContractReturnType<
  abi extends Abi | undefined = Abi | undefined,
  functionName extends AbiViewFunctionNames<abi> = AbiViewFunctionNames<abi>,
> = InferAbiFunctionReturns<abi, functionName>

/** https://khizab.dev/core/api/actions/readContract */
export async function readContract<
  config extends Config,
  abi extends Abi | undefined = Abi | undefined,
  functionName extends AbiViewFunctionNames<abi> = AbiViewFunctionNames<abi>,
  args extends InferAbiFunctionParams<
    abi,
    functionName
  > = InferAbiFunctionParams<abi, functionName>,
>(
  config: config,
  parameters: ReadContractParameters<abi, functionName, args>,
): Promise<ReadContractReturnType<abi, functionName>> {
  const { functionName, args, typeArguments, abi, ...rest } = parameters
  const client = config.getClient()
  let name: MoveFunctionId = functionName

  if (abi) {
    name = `${abi.address}::${abi.name}::${functionName}`
  }
  try {
    const result = await client.view({
      payload: {
        function: name as MoveFunctionId,
        functionArguments: args.map((a) => String(a)),
        typeArguments,
      },
      ...rest,
    })
    const types = abi?.exposed_functions.find((f) => f.name === name)?.return
    if (!!types?.length && !!result.length) {
      const parsed = parseAbiReturnType(types, result)
      return parsed as InferAbiFunctionReturns<abi, functionName>
    }

    return result as InferAbiFunctionReturns<abi, functionName>
  } catch (error: any) {
    console.log('error in read contracts', error)

    throw new Error(error)
  }
}
