////////////////////////////////////////////////////////////////////////////////
// Context
////////////////////////////////////////////////////////////////////////////////

export {
  type KhizabProviderProps,
  KhizabContext,
  KhizabProvider,
  /** @deprecated Use `KhizabContext` instead */
  KhizabContext as Context,
  /** @deprecated Use `KhizabProvider` instead */
  KhizabProvider as KhizabConfig,
} from "../context.js";

////////////////////////////////////////////////////////////////////////////////
// Errors
////////////////////////////////////////////////////////////////////////////////

export { type BaseErrorType, BaseError } from "../errors/base.js";

export {
  type KhizabProviderNotFoundErrorType,
  KhizabProviderNotFoundError,
} from "../errors/context.js";

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export {
  type UseAccountParameters,
  type UseAccountReturnType,
  useAccount,
} from "../hooks/useAccount.js";

export {
  type UseAccountEffectParameters,
  useAccountEffect,
} from "../hooks/useAccountEffect.js";

export {
  type UseBalanceParameters,
  type UseBalanceReturnType,
  useBalance,
} from "../hooks/useBalance.js";

export {
  type UseBlockByHeightParameters,
  type UseBlockByHeightReturnType,
  useBlockByHeight,
} from "../hooks/useBlockByHeight.js";

export {
  type UseBlockByVersionParameters,
  type UseBlockByVersionReturnType,
  useBlockByVersion,
} from "../hooks/useBlockByVersion.js";
export { type UseClientReturnType, useClient } from "../hooks/useClient.js";

export {
  type UseConfigParameters,
  type UseConfigReturnType,
  useConfig,
} from "../hooks/useConfig.js";

export {
  type UseConnectParameters,
  type UseConnectReturnType,
  useConnect,
} from "../hooks/useConnect.js";

export {
  type UseConnectionsParameters,
  type UseConnectionsReturnType,
  useConnections,
} from "../hooks/useConnections.js";

export {
  type UseConnectorsParameters,
  type UseConnectorsReturnType,
  useConnectors,
} from "../hooks/useConnectors.js";

export {
  type UseDisconnectParameters,
  type UseDisconnectReturnType,
  useDisconnect,
} from "../hooks/useDisconnect.js";
export {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
  /** @deprecated Use `useWriteContract` instead */
  useReadContract as useContractRead,
} from "../hooks/useReadContract.js";

export {
  type UseReadContractsParameters,
  type UseReadContractsReturnType,
  useReadContracts,
  /** @deprecated Use `useWriteContract` instead */
  useReadContracts as useContractReads,
} from "../hooks/useReadContracts.js";

export {
  type UseReconnectParameters,
  type UseReconnectReturnType,
  useReconnect,
} from "../hooks/useReconnect.js";

export {
  type UseTokenParameters,
  type UseTokenReturnType,
  /** @deprecated Use `useReadContracts` instead */
  useToken,
} from "../hooks/useToken.js";
////////////////////////////////////////////////////////////////////////////////
// Hydrate
////////////////////////////////////////////////////////////////////////////////

export { type HydrateProps, Hydrate } from "../hydrate.js";

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
} from "@khizab/core";

////////////////////////////////////////////////////////////////////////////////
// Version
////////////////////////////////////////////////////////////////////////////////

export { version } from "../version.js";
