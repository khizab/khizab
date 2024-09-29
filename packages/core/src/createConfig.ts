import { persist, subscribeWithSelector } from 'zustand/middleware'
import { type Mutate, type StoreApi, createStore } from 'zustand/vanilla'

import { Aptos, AptosConfig, type ClientConfig } from '@aptos-labs/ts-sdk'
import { type AccountInfo } from '@aptos-labs/wallet-adapter-core'
import {
  type ConnectorEventMap,
  type CreateConnectorFn,
} from './connectors/createConnector.js'
import { Emitter, type EventData, createEmitter } from './createEmitter.js'
import { type Storage, createStorage, noopStorage } from './createStorage.js'
import { NetworkNotConfiguredError } from './errors/config.js'
import type { Network } from './types/network.js'
import type { Evaluate, ExactPartial } from './types/utils.js'
import { uid } from './utils/uid.js'
import { version } from './version.js'

export type CreateConfigParameters<
  network extends Network = Network,
  clientConfig extends Partial<ClientConfig> = Partial<ClientConfig>,
> = Evaluate<{
  network: network
  connectors?: CreateConnectorFn[] | undefined
  multiInjectedProviderDiscovery?: boolean | undefined
  storage?: Storage | null | undefined
  ssr?: boolean | undefined
  syncConnectedNetwork?: boolean | undefined
  clientConfig?: clientConfig
}>

export function createConfig<
  const network extends Network,
  clientConfig extends Partial<ClientConfig>,
>(
  parameters: CreateConfigParameters<network, clientConfig>,
): Config<network, clientConfig> {
  const {
    storage = createStorage({
      storage:
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : noopStorage,
    }),
    syncConnectedNetwork = true,
    ssr,
    ...rest
  } = parameters

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Set up connectors, clients, etc.
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const network = createStore(() => rest.network)
  const clientConfig = createStore(() => rest.clientConfig)

  const connectors = createStore(() => [...(rest.connectors ?? [])].map(setup))
  function setup(connectorFn: CreateConnectorFn): Connector {
    // Set up emitter with uid and add to connector so they are "linked" together.
    const emitter = createEmitter<ConnectorEventMap>(uid())
    const connector = {
      ...connectorFn({ emitter, network: network.getState(), storage }),
      emitter,
      uid: emitter.uid,
    }

    // Start listening for `connect` events on connector setup
    // This allows connectors to "connect" themselves without user interaction (e.g. MetaMask's "Manually connect to current site")
    emitter.on('connect', connect)
    connector.setup?.()

    return connector
  }

  let client: Aptos
  function getClient(): Aptos {
    const _network = network.getState()
    const _clientConfig = clientConfig.getState()

    // chainId specified and not configured
    if (!_network) throw new NetworkNotConfiguredError()

    // // If a memoized client exists
    {
      if (client) return client
    }

    const aptosConfig = new AptosConfig({
      network: _network.name,
      fullnode: _network.rpcUrls.default[0],
      clientConfig: _clientConfig,
    })
    const newClient = new Aptos(aptosConfig)

    client = newClient
    return newClient
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create store
  /////////////////////////////////////////////////////////////////////////////////////////////////

  function getInitialState() {
    return {
      connections: new Map(),
      current: undefined,
      status: 'disconnected',
    } satisfies State
  }

  let currentVersion: number
  const prefix = '0.0.0-canary-'
  if (version.startsWith(prefix))
    currentVersion = parseInt(version.replace(prefix, ''))
  else currentVersion = parseInt(version.split('.')[0] ?? '0')

  const store = createStore(
    subscribeWithSelector(
      // only use persist middleware if storage exists
      storage
        ? persist(getInitialState, {
            migrate(persistedState, version) {
              if (version === currentVersion) return persistedState as State

              const initialState = getInitialState()

              return initialState
            },
            name: 'store',
            partialize(state) {
              // Only persist "critical" store properties to preserve storage size.
              return {
                connections: {
                  __type: 'Map',
                  value: Array.from(state.connections.entries()).map(
                    ([key, connection]) => {
                      const { id, name, type, uid } = connection.connector
                      const connector = { id, name, type, uid }
                      return [key, { ...connection, connector }]
                    },
                  ),
                } as unknown as PartializedState['connections'],
                current: state.current,
              } satisfies PartializedState
            },
            skipHydration: ssr,
            storage: storage as Storage<Record<string, unknown>>,
            version: currentVersion,
          })
        : getInitialState,
    ),
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Subscribe to changes
  /////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Emitter listeners
  /////////////////////////////////////////////////////////////////////////////////////////////////

  function change(data: EventData<ConnectorEventMap, 'change'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)

      console.log('data => ', { data, connection })
      if (!connection) return x
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          account: (data as AccountInfo) ?? connection.account,
          connector: connection.connector,
        }),
      }
    })
  }
  function connect(data: EventData<ConnectorEventMap, 'connect'>) {
    console.log('connect => ', data)

    // Disable handling if reconnecting/connecting
    if (
      store.getState().status === 'connecting' ||
      store.getState().status === 'reconnecting'
    )
      return

    store.setState((x) => {
      const connector = connectors.getState().find((x) => x.uid === data.uid)

      if (!connector) return x
      return {
        ...x,
        connections: new Map(x.connections).set(data.uid, {
          account: data as AccountInfo,
          connector: connector,
        }),
        current: data.uid,
        status: 'connected',
      }
    })
  }
  function disconnect(data: EventData<ConnectorEventMap, 'disconnect'>) {
    store.setState((x) => {
      const connection = x.connections.get(data.uid)
      if (connection) {
        connection.connector.emitter.off('change', change)
        connection.connector.emitter.off('disconnect', disconnect)
        connection.connector.emitter.on('connect', connect)
      }

      x.connections.delete(data.uid)

      if (x.connections.size === 0)
        return {
          ...x,
          connections: new Map(),
          current: undefined,
          status: 'disconnected',
        }

      const nextConnection = x.connections.values().next().value as Connection
      return {
        ...x,
        connections: new Map(x.connections),
        current: nextConnection.connector.uid,
      }
    })
  }

  return {
    get network() {
      return network.getState() as network
    },
    get connectors() {
      return connectors.getState()
    },
    storage,
    getClient,
    get state() {
      return store.getState() as unknown as State
    },
    setState(value) {
      let newState: State
      if (typeof value === 'function') newState = value(store.getState() as any)
      else newState = value

      // Reset state if it got set to something not matching the base state
      const initialState = getInitialState()
      if (typeof newState !== 'object') newState = initialState
      const isCorrupt = Object.keys(initialState).some((x) => !(x in newState))
      if (isCorrupt) newState = initialState

      store.setState(newState, true)
    },
    subscribe(selector, listener, options) {
      return store.subscribe(
        selector as unknown as (state: State) => any,
        listener,
        options
          ? { ...options, fireImmediately: options.emitImmediately }
          : undefined,
      )
    },

    _internal: {
      store,
      ssr: Boolean(ssr),
      syncConnectedNetwork,
      clientConfig: rest.clientConfig,
      network: rest.network,
      connectors: {
        setup,
        setState(value) {
          return connectors.setState(
            typeof value === 'function' ? value(connectors.getState()) : value,
            true,
          )
        },
        subscribe(listener) {
          return connectors.subscribe(listener)
        },
      },
      events: { change, connect, disconnect },
    },
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Types
/////////////////////////////////////////////////////////////////////////////////////////////////

export type Config<
  network extends Network = Network,
  clientConfig extends Partial<ClientConfig> = Partial<ClientConfig>,
> = {
  readonly network: network
  readonly connectors: readonly Connector[]
  readonly storage: Storage | null

  readonly state: State
  setState(value: State | ((state: State) => State)): void
  subscribe<state>(
    selector: (state: State) => state,
    listener: (state: state, previousState: state) => void,
    options?:
      | {
          emitImmediately?: boolean | undefined
          equalityFn?: ((a: state, b: state) => boolean) | undefined
        }
      | undefined,
  ): () => void

  getClient(): Aptos

  /**
   * Not part of versioned API, proceed with caution.
   * @internal
   */
  _internal: {
    readonly store: Mutate<StoreApi<any>, [['zustand/persist', any]]>
    readonly ssr: boolean
    readonly syncConnectedNetwork: boolean
    readonly clientConfig?: clientConfig
    readonly network?: Network
    connectors: {
      setup(connectorFn: CreateConnectorFn): Connector
      setState(value: Connector[] | ((state: Connector[]) => Connector[])): void
      subscribe(
        listener: (state: Connector[], prevState: Connector[]) => void,
      ): () => void
    }
    events: {
      change(data: EventData<ConnectorEventMap, 'change'>): void
      connect(data: EventData<ConnectorEventMap, 'connect'>): void
      disconnect(data: EventData<ConnectorEventMap, 'disconnect'>): void
    }
  }
}

export type State = {
  connections: Map<string, Connection>
  current: string | undefined
  status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
}

export type PartializedState = Evaluate<
  ExactPartial<Pick<State, 'connections' | 'current' | 'status'>>
>

export type Connection = {
  account: AccountInfo
  connector: Connector
}

export type Connector = ReturnType<CreateConnectorFn> & {
  emitter: Emitter<ConnectorEventMap>
  uid: string
}
