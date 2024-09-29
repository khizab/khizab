'use client'

import { type Config, type ResolvedRegister } from '@khizab/core'
import { useContext } from 'react'

import { KhizabContext } from '../context.js'
import { KhizabProviderNotFoundError } from '../errors/context.js'
import type { ConfigParameter } from '../types/properties.js'

export type UseConfigParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseConfigReturnType<config extends Config = Config> = config

/** https://khizab.sh/react/api/hooks/useConfig */
export function useConfig<config extends Config = ResolvedRegister['config']>(
  parameters: UseConfigParameters<config> = {},
): UseConfigReturnType<config> {
  const config = parameters.config ?? useContext(KhizabContext)
  if (!config) throw new KhizabProviderNotFoundError()
  return config as UseConfigReturnType<config>
}
