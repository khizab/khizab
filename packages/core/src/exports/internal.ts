////////////////////////////////////////////////////////////////////////////////
// Emitter
////////////////////////////////////////////////////////////////////////////////

export { type EventData, Emitter, createEmitter } from '../createEmitter.js'

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

export {
  type NetworkInfo,
  type WalletInfo,
  type AccountInfo,
  type SignMessagePayload,
  type SignMessageResponse,
} from '../types/connector.js'

export * from '../types/network.js'

export {
  type ChainIdParameter,
  type ConnectorParameter,
  type ScopeKeyParameter,
} from '../types/properties.js'

export {
  type Compute,
  type UnionCompute,
  type Evaluate,
  type ExactPartial,
  type Mutable,
  type Omit,
  type OneOf,
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '../types/utils.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////

export { deepEqual } from '../utils/deepEqual.js'

export { uid } from '../utils/uid.js'
