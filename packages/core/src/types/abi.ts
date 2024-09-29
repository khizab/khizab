import type {
  MoveAbility,
  MoveFunctionId,
  MoveFunctionVisibility,
  MoveValue,
} from "@aptos-labs/ts-sdk";

export type MoveTypeMapping = {
  address: `0x${string}`;
  u8: number;
  u16: number;
  u32: number;
  u64: bigint;
  u128: bigint;
  u256: bigint;
  bool: boolean;
  "0x1::string::String": string;
  "vector<u8>": Uint8Array;
};

export type Abi = {
  address: string;
  name: string;
  friends: readonly string[];
  exposed_functions: readonly AbiFunction[];
  structs: readonly ABIStruct[];
};

export type AbiFunction = {
  name: string;
  visibility: `${MoveFunctionVisibility}`;
  is_entry: boolean;
  is_view: boolean;
  generic_type_params: readonly ABIFunctionGenericTypeParam[];
  params: readonly MoveValue[];
  return: readonly MoveValue[];
};

type MoveTypeToTS<T extends keyof MoveTypeMapping & MoveValue> =
  MoveTypeMapping[T];

type MoveValues = keyof MoveTypeMapping | MoveValue;

// Utility type to convert an array of Move types to TypeScript types
export type ParseMoveType<T extends readonly MoveValues[]> = {
  [K in keyof T]: T[K] extends keyof MoveTypeMapping
    ? MoveTypeToTS<T[K]>
    : T[K] extends MoveValue
    ? MoveValue
    : never;
};

// export type AbiViewFunctionNames<T extends Abi | undefined> = T extends Abi
//   ? Extract<T['exposed_functions'][number], { is_view: true }>['name']
//   : MoveFunctionId

export type AbiViewFunctionNames<T extends Abi | undefined> = T extends Abi
  ? Extract<T["exposed_functions"][number], { is_view: true }>["name"]
  : T extends undefined
  ? MoveFunctionId
  : never;

export type InferAbiFunction<
  T extends Abi,
  F extends AbiViewFunctionNames<T>
> = Extract<T["exposed_functions"][number], { name: F; is_view: true }>;

export type InferAbiFunctionParams<
  T extends Abi | undefined,
  F extends AbiViewFunctionNames<T>
> = T extends Abi
  ? ParseMoveType<InferAbiFunction<T, F>["params"]>
  : MoveValue[];

export type InferAbiFunctionReturns<
  T extends Abi | undefined,
  F extends AbiViewFunctionNames<T>
> = T extends Abi
  ? ParseMoveType<InferAbiFunction<T, F>["return"]>
  : MoveValue[];

export interface ABIStruct {
  name: string;
  is_native: boolean;
  abilities: readonly `${MoveAbility}`[];
  generic_type_params: readonly ABIFunctionGenericTypeParam[];
  fields: readonly ABIStructField[];
}
export interface ABIFunctionGenericTypeParam {
  constraints: any[];
}
export interface ABIStructField {
  name: string;
  type: string;
}
