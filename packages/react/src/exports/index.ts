////////////////////////////////////////////////////////////////////////////////
// Context
////////////////////////////////////////////////////////////////////////////////

export {
  type KhizabProviderProps,
  KhizabContext,
  KhizabProvider,
} from '../context.js'

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { type BaseErrorType, BaseError } from '../errors/base.js'

export {
  type KhizabProviderNotFoundErrorType,
  KhizabProviderNotFoundError,
} from '../errors/context.js'

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export {
  type UseAccountParameters,
  type UseAccountReturnType,
  useAccount,
} from '../hooks/useAccount.js'

export {
  type UseAccountEffectParameters,
  useAccountEffect,
} from '../hooks/useAccountEffect.js'

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from '../hooks/useBalance.js'

export {
  type UseBlockByHeightParameters,
  type UseBlockByHeightReturnType,
  useBlockByHeight,
} from '../hooks/useBlockByHeight.js'

export {
  type UseBlockByVersionParameters,
  type UseBlockByVersionReturnType,
  useBlockByVersion,
} from '../hooks/useBlockByVersion.js'
export { type UseClientReturnType, useClient } from '../hooks/useClient.js'

export {
  type UseConfigParameters,
  type UseConfigReturnType,
  useConfig,
} from '../hooks/useConfig.js'

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from '../hooks/useConnect.js'

export {
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from '../hooks/useConnections.js'

export {
  type UseConnectorsParameters,
  type UseConnectorsReturnType,
  useConnectors,
} from '../hooks/useConnectors.js'

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from '../hooks/useDisconnect.js'

export {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
} from '../hooks/useReadContract.js'

export {
  type UseReadContractsParameters,
  type UseReadContractsReturnType,
  useReadContracts,
} from '../hooks/useReadContracts.js'

export {
  type UseGetAccountInfoParameters,
  type UseGetAccountInfoReturnType,
  useGetAccountInfo,
} from '../hooks/useGetAccountInfo.js'

export {
  type UseGetAccountModuleParameters,
  type UseGetAccountModuleReturnType,
  useGetAccountModule,
} from '../hooks/useGetAccountModule.js'

export {
  type UseGetAccountModulesParameters,
  type UseGetAccountModulesReturnType,
  useGetAccountModules,
} from '../hooks/useGetAccountModules.js'

export {
  type UseGetAccountResourceParameters,
  type UseGetAccountResourceReturnType,
  useGetAccountResource,
} from '../hooks/useGetAccountResource.js'

export {
  type UseGetAccountResourcesParameters,
  type UseGetAccountResourcesReturnType,
  useGetAccountResources,
} from '../hooks/useGetAccountResources.js'

export {
  type UseGetAccountTransactionsParameters,
  type UseGetAccountTransactionsReturnType,
  useGetAccountTransactions,
} from '../hooks/useGetAccountTransactions.js'

export {
  type UseGetLedgerInfoParameters,
  type UseGetLedgerInfoReturnType,
  useGetLedgerInfo,
} from '../hooks/useGetLedgerInfo.js'

export {
  type UseGetTableItemParameters,
  type UseGetTableItemReturnType,
  useGetTableItem,
} from '../hooks/useGetTableItem.js'

export {
  type UseGetTransactionsParameters,
  type UseGetTransactionsReturnType,
  useGetTransactions,
} from '../hooks/useGetTransactions.js'

export {
  type UseGetTransactionParameters,
  type UseGetTransactionReturnType,
  useGetTransaction,
} from '../hooks/useGetTransaction.js'

export {
  type UseGetConnectorParameters,
  type UseGetConnectorReturnType,
  useGetConnector,
} from '../hooks/useGetConnector.js'

export {
  type UseWriteContractParameters,
  type UseWriteContractReturnType,
  useWriteContract,
} from '../hooks/useWriteContract.js'

export {
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from '../hooks/useReconnect.js'

export {
  type UseTokenParameters,
  type UseTokenReturnType,
  useToken,
} from '../hooks/useToken.js'
////////////////////////////////////////////////////////////////////////////////
// Hydrate
////////////////////////////////////////////////////////////////////////////////

export { type HydrateProps, Hydrate } from '../hydrate.js'

////////////////////////////////////////////////////////////////////////////////
// @khizab/core
////////////////////////////////////////////////////////////////////////////////

export {
  // Config
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  type State,
  createConfig,
  // Connector
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
  // Errors
  type NetworkNotConfiguredErrorType,
  NetworkNotConfiguredError,
  type ConnectorAlreadyConnectedErrorType,
  ConnectorAlreadyConnectedError,
  type ConnectorNotFoundErrorType,
  ConnectorNotFoundError,
  type ConnectorAccountNotFoundErrorType,
  ConnectorAccountNotFoundError,
  type ProviderNotFoundErrorType,
  ProviderNotFoundError,
  type SwitchChainNotSupportedErrorType,
  SwitchChainNotSupportedError,
  // Storage
  type CreateStorageParameters,
  type Storage,
  createStorage,
  noopStorage,
  // Types
  type Register,
  type ResolvedRegister,
  // Utilities
  cookieStorage,
  cookieToInitialState,
  deepEqual,
  deserialize,
  normalizeChainId,
  parseCookie,
  serialize,
} from '@khizab/core'

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from '../version.js'
