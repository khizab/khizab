'use client'

import {
  type Abi,
  type AbiViewFunctionNames,
  type Config,
  type ReadContractParameters,
  type ReadContractsErrorType,
  type ResolvedRegister,
} from '@khizab/core'

import { type Evaluate } from '@khizab/core/internal'
import {
  type ReadContractsData,
  type ReadContractsOptions,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
  readContractsQueryOptions,
} from '@khizab/core/query'
import { useMemo } from 'react'

import {
  type ConfigParameter,
  type QueryParameter,
} from '../types/properties.js'
import {
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseReadContractsParameters<
  abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  payloads extends readonly Exclude<
    ReadContractParameters<abi, functionName>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<abi, functionName>, 'abi'>[],
  allowFailure extends boolean = boolean,
  config extends Config = Config,
  selectData = ReadContractsData<abi, functionName>,
> = Evaluate<
  ReadContractsOptions<abi, functionName, payloads, allowFailure> &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractsQueryFnData<abi, functionName>,
      ReadContractsErrorType,
      selectData,
      ReadContractsQueryKey<abi, functionName>
    >
>

export type UseReadContractsReturnType<
  abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  selectData = ReadContractsData<abi, functionName>,
> = UseQueryReturnType<selectData, ReadContractsErrorType>

/** https://khizab.dev/react/api/hooks/useReadContracts */
export function useReadContracts<
  abi extends Abi | undefined,
  functionName extends AbiViewFunctionNames<abi>,
  payloads extends readonly Exclude<
    ReadContractParameters<abi, functionName>,
    'abi'
  >[] = readonly Exclude<ReadContractParameters<abi, functionName>, 'abi'>[],
  allowFailure extends boolean = boolean,
  config extends Config = ResolvedRegister['config'],
  selectData extends ReadContractsData<abi, functionName> = ReadContractsData<
    abi,
    functionName
  >,
>(
  parameters: UseReadContractsParameters<
    abi,
    functionName,
    payloads,
    allowFailure,
    config,
    selectData
  >,
): UseReadContractsReturnType<abi, functionName> {
  const { payloads = [], query = {} } = parameters

  const config = useConfig(parameters)

  const options = readContractsQueryOptions<
    config,
    abi,
    functionName,
    payloads,
    allowFailure
  >(config, { ...parameters })

  const enabled = useMemo(() => {
    let isContractsValid = false
    for (const payload of payloads) {
      const { abi, functionName } = payload as Exclude<
        ReadContractParameters<abi, functionName>,
        'abi'
      >
      if (!abi || !functionName) {
        isContractsValid = false
        break
      }
      isContractsValid = true
    }
    return Boolean(isContractsValid && (query.enabled ?? true))
  }, [payloads, query.enabled])

  return useQuery({
    ...options,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
