import {
  type CommittedTransactionResponse,
  type InputEntryFunctionData,
  type InputGenerateTransactionOptions,
  type MoveFunctionId,
} from '@aptos-labs/ts-sdk'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type {
  Abi,
  AbiFunctionNames,
  InferAbiFunctionParams,
} from '../types/abi.js'
import { getConnector, type GetConnectorErrorType } from './getConnector.js'
import { getClient } from './getClient.js'
import { isAptosWalletErrorResult } from '../errors/connector.js'

export type WriteContractParameters<
  abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true> = AbiFunctionNames<
    abi,
    true
  >,
  args extends InferAbiFunctionParams<
    abi,
    functionName,
    true
  > = InferAbiFunctionParams<abi, functionName, true>,
> = {
  abi?: abi
  functionName: functionName
  args: args
  typeArguments?: MoveFunctionId[] | undefined
  options?: InputGenerateTransactionOptions
}

export type WriteContractReturnType = CommittedTransactionResponse

export type WriteContractErrorType =
  // getConnector()
  | GetConnectorErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://khizab.dev/core/api/actions/writeContract */
export async function writeContract<
  config extends Config,
  const abi extends Abi | undefined,
  functionName extends AbiFunctionNames<abi, true>,
  args extends InferAbiFunctionParams<abi, functionName, true>,
>(
  config: config,
  parameters: WriteContractParameters<abi, functionName, args>,
): Promise<WriteContractReturnType> {
  const { abi, functionName, args, options, typeArguments } = parameters

  let name: MoveFunctionId = functionName

  if (abi) {
    name = `${abi.address}::${abi.name}::${functionName}`
  }

  const transaction: InputEntryFunctionData = {
    function: name,
    functionArguments:
      args && args.length > 0 ? args.map((a) => String(a)) : [],
    typeArguments: typeArguments ?? [],
  }
  const connector = await getConnector(config)
  const client = getClient(config)

  const response = await connector.signAndSubmitTransaction({
    payload: transaction,
    options,
  })

  if (isAptosWalletErrorResult(response)) throw response

  const result = await client?.waitForTransaction({
    transactionHash: response.hash,
  })
  if (!result) throw new Error('Transaction failed')

  return result
}
