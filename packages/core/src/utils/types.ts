import type { AnyNumber, HexInput } from '@aptos-labs/ts-sdk'

export function isNumeric(value: unknown): value is AnyNumber {
  if (typeof value === 'number' || typeof value === 'bigint') return true
  if (typeof value === 'string') return /^-?\d+$/.test(value)
  return false
}

export function toAnyNumber(
  value: HexInput | AnyNumber,
): AnyNumber | undefined {
  if (typeof value === 'string' && /^-?\d+$/.test(value)) return BigInt(value)
  if (typeof value === 'number' || typeof value === 'bigint') return value
  return undefined
}

export function isHexInput(value: unknown): value is HexInput {
  if (value instanceof Uint8Array) return true
  // Check if it's a valid hex string
  if (typeof value === 'string') return /^0x[0-9A-Fa-f]+$/.test(value.trim())

  return false
}
