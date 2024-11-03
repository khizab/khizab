import { createUseReadContract, createUseWriteContract } from 'khizab/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// increase
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const increaseAbi = {
  address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
  name: 'increase',
  friends: [],
  exposed_functions: [
    {
      name: 'create_counter',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'decrement_c',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'raise_c',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'view_count',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address'],
      return: ['u64'],
    },
  ],
  structs: [
    {
      name: 'Count',
      is_native: false,
      is_event: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [{ name: 'count', type: 'u64' }],
    },
  ],
} as const

export const increaseConfig = { abi: increaseAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link increaseAbi}__
 */
export const useReadIncrease = /*#__PURE__*/ createUseReadContract({
  abi: increaseAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link increaseAbi}__ and `functionName` set to `"view_count"`
 */
export const useReadIncreaseViewCount = /*#__PURE__*/ createUseReadContract({
  abi: increaseAbi,
  functionName: 'view_count',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link increaseAbi}__
 */
export const useWriteIncrease = /*#__PURE__*/ createUseWriteContract({
  abi: increaseAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link increaseAbi}__ and `functionName` set to `"create_counter"`
 */
export const useWriteIncreaseCreateCounter =
  /*#__PURE__*/ createUseWriteContract({
    abi: increaseAbi,
    functionName: 'create_counter',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link increaseAbi}__ and `functionName` set to `"decrement_c"`
 */
export const useWriteIncreaseDecrementC = /*#__PURE__*/ createUseWriteContract({
  abi: increaseAbi,
  functionName: 'decrement_c',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link increaseAbi}__ and `functionName` set to `"raise_c"`
 */
export const useWriteIncreaseRaiseC = /*#__PURE__*/ createUseWriteContract({
  abi: increaseAbi,
  functionName: 'raise_c',
})
