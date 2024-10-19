////////////////////////////////////////////////////////////////////////////////
// @khizab/core/codegen
////////////////////////////////////////////////////////////////////////////////

export * from '@khizab/core/codegen'

////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

export {
  type CreateUseReadContractParameters,
  type CreateUseReadContractReturnType,
  createUseReadContract,
} from '../hooks/codegen/createUseReadContract.js'

export {
  type CreateUseWriteContractParameters,
  type CreateUseWriteContractReturnType,
  createUseWriteContract,
} from '../hooks/codegen/createUseWriteContract.js'