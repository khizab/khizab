'use client'

import { type ResolvedRegister, type State } from '@khizab/core'
import { createContext, createElement } from 'react'
import { Hydrate } from './hydrate.js'

export const KhizabContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type KhizabProviderProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function KhizabProvider(
  parameters: React.PropsWithChildren<KhizabProviderProps>,
) {
  const { children, config } = parameters

  const props = { value: config }
  return createElement(
    Hydrate,
    parameters,
    createElement(KhizabContext.Provider, props, children),
  )
}
