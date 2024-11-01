'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
  Abi,
} from '@khizab/core'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@khizab/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & {
  mutation?:
    | UseMutationParameters<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<Abi, never, never>,
        context
      >
    | undefined
}

export type UseWriteContractReturnType<context = unknown,> =
  UseMutationReturnType<
    WriteContractData,
    WriteContractErrorType,
    WriteContractVariables<Abi, never, never>,
    context
  > & {
    writeContract: WriteContractMutate
    writeContractAsync: WriteContractMutateAsync
  }

/** https://khizab.dev/react/api/hooks/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = {},
): UseWriteContractReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = writeContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseWriteContractReturnType<context>
  return {
    ...result,
    writeContract: mutate as Return['writeContract'],
    writeContractAsync: mutateAsync as Return['writeContractAsync'],
  }
}
