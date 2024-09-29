import type { Network } from '../types/network.js'
import type { Assign } from '../types/utils.js'

export function defineNetwork<const network extends Network,>(
  network: network,
): Assign<Network, network> {
  return {
    ...network,
  } as Assign<Network, network>
}
