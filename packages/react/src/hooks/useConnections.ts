'use client'

import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@khizab/core'
import { useSyncExternalStore } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseConnectionsParameters = ConfigParameter

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://khizab.dev/react/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = {},
): UseConnectionsReturnType {
  const config = useConfig(parameters)

  return useSyncExternalStore(
    (onChange) => watchConnections(config, { onChange }),
    () => getConnections(config),
    () => getConnections(config),
  )
}
