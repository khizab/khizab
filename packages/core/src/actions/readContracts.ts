import { type Config } from '../createConfig.js'
import type { Abi, AbiFunctionNames } from '../types/abi.js'
import {
  type ReadContractParameters,
  readContract,
  type ReadContractErrorType,
  type ReadContractReturnType,
} from './readContract.js'

export type ReadContractsParameters<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
  payloads extends readonly Exclude<
    ReadContractParameters<T, F>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<T, F>, 'abi'>[],
  allowFailure extends boolean = true,
> = {
  abi?: T
  payloads: payloads
  allowFailure?: allowFailure
}

export type ReadContractsErrorType = ReadContractErrorType

export type ReadContractsReturnType<
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
> = ReadContractReturnType<T, F>[]

export async function readContracts<
  config extends Config,
  T extends Abi | undefined,
  F extends AbiFunctionNames<T>,
  payloads extends readonly Exclude<
    ReadContractParameters<T, F>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<T, F>, 'abi'>[],
  allowFailure extends boolean = true,
>(
  config: config,
  parameters: ReadContractsParameters<T, F, payloads, allowFailure>,
): Promise<ReadContractsReturnType<T, F>> {
  const { abi, payloads } = parameters

  try {
    const promises = () =>
      payloads.map((payload) => readContract(config, { ...payload, abi }))

    const multicallResults = await Promise.all(promises())

    return multicallResults as ReadContractsReturnType<T, F>
  } catch (error) {
    console.log('error in readContracts', error)
    if (error) throw error
    return [] as ReadContractsReturnType<T, F>
  }
}
