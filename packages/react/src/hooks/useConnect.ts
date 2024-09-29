'use client'

import { useMutation } from '@tanstack/react-query'
import {
  type Config,
  type ConnectErrorType,
  type Connector,
  type ResolvedRegister,
} from '@khizab/core'
import type { Evaluate } from '@khizab/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@khizab/core/query'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnectors } from './useConnectors.js'

export type UseConnectParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          ConnectData,
          ConnectErrorType,
          ConnectVariables,
          context
        >
      | undefined
  }
>

export type UseConnectReturnType<context = unknown> = Evaluate<
  UseMutationReturnType<
    ConnectData,
    ConnectErrorType,
    ConnectVariables,
    context
  > & {
    connect: ConnectMutate
    connectAsync: ConnectMutateAsync
    connectors: readonly Connector[]
  }
>

/** https://khizab.dev/react/api/hooks/useConnect */
export function useConnect<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseConnectParameters<config, context> = {},
): UseConnectReturnType {
  const { mutation } = parameters

  const config = useConfig(parameters)
  const connectors = useConnectors({ config })

  const mutationOptions = connectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  // Reset mutation back to an idle state when the connector disconnects.
  useEffect(() => {
    return config.subscribe(
      ({ status }) => status,
      (status, previousStatus) => {
        if (previousStatus === 'connected' && status === 'disconnected')
          result.reset()
      },
    )
  }, [config, result])

  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors,
  }
}
