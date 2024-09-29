import { type Config, type Connector } from '../createConfig.js'

export type ChainIdParameter<
  config extends Config,
  chainId extends config['network']['id'] | undefined = config['network']['id'],
> = {
  chainId?:
    | (chainId extends config['network']['id'] ? chainId : undefined)
    | config['network']['id']
    | undefined
}

export type ConnectorParameter = {
  connector?: Connector | undefined
}

export type ScopeKeyParameter = { scopeKey?: string | undefined }

export type SyncConnectedChainParameter = {
  syncConnectedChain?: boolean | undefined
}
