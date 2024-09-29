import type { MoveValue } from '@aptos-labs/ts-sdk'

export function parseAbiReturnType(
  returnTypes: readonly MoveValue[],
  result: readonly MoveValue[],
): any {
  return returnTypes.map((type, index) => parseAbiType(type, result[index]))
}
export function parseAbiType(abiType: any, value: any): any {
  switch (abiType) {
    case 'bool':
      return Boolean(value)
    case 'u8':
    case 'u16':
    case 'u32':
      return Number(value)
    case 'u64':
    case 'u128':
    case 'u256':
      return BigInt(value)
    case 'address':
    case '0x1::string::String':
      return String(value)
    case 'vector<u8>':
      return Array.isArray(value) ? value.map(Number) : []
    default:
      return value
  }
}
