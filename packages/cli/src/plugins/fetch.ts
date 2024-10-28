import { homedir } from 'node:os'
import { default as fs } from 'fs-extra'
import { join } from 'pathe'

import type { ContractConfig, Plugin } from '../config.js'
import type { Compute, RequiredBy } from '../types.js'
import type { Abi } from '@khizab/core'
import { NetworkName } from '@khizab/core/internal'

export type FetchConfig = {
  /**
   * Name of source.
   */
  name?: ContractConfig['name'] | undefined
  /**
   * Duration in milliseconds to cache ABIs from request.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: {
    /**
     * Name
     */
    name?: string
    /**
     * Contract Address
     */
    address: `0x${string}`

    /**
     * Module Name
     */
    module: string
  }[]

  /**
   * Network to fetch ABIs from
   */
  network?: NetworkName
  /**
   * Function for creating a cache key for contract.
   */
  getCacheKey?:
    | ((config: {
        contract: {
          name?: string
          address: `0x${string}`
          module: string
        }
      }) => string)
    | undefined
  /**
   * Duration in milliseconds before request times out.
   *
   * @default 5_000 // 5s in ms
   */
  timeoutDuration?: number | undefined
}

type FetchResult = Compute<RequiredBy<Plugin, 'contracts'>>

/** Fetches and parses contract ABIs from network resource with `fetch`. */
export function fetch(config: FetchConfig): FetchResult {
  const {
    name = 'Fetch',
    cacheDuration = 1_800_000,
    contracts: contractConfigs,
    getCacheKey = ({ contract }) =>
      `${contract.address}__${contract.module}${
        contract.name ? `__${contract.name}` : ''
      }`,
    timeoutDuration = 5_000,
    network = NetworkName.MAINNET,
  } = config

  return {
    async contracts() {
      const cacheDir = join(homedir(), '.khizab-cli/plugins/fetch/cache')
      await fs.ensureDir(cacheDir)

      const timestamp = Date.now() + cacheDuration
      const contracts = []

      for (const contract of contractConfigs) {
        const cacheKey = getCacheKey({ contract })
        const cacheFilePath = join(cacheDir, `${cacheKey}.json`)
        const cachedFile = await fs.readJSON(cacheFilePath).catch(() => null)

        let abi: Abi | undefined
        if (cachedFile?.timestamp > Date.now()) abi = cachedFile.abi
        else {
          try {
            const controller = new globalThis.AbortController()
            const timeout = setTimeout(
              () => controller.abort(),
              timeoutDuration,
            )

            const response = await globalThis.fetch(
              `https://fullnode.${network}.aptoslabs.com/v1/accounts/${contract.address}/module/${contract.module}`,
            )

            if (!response.ok) {
              throw new Error(
                `Failed to fetch the ABI. ${response.status}(${response.statusText})`,
              )
            }

            clearTimeout(timeout)

            abi = await response.json().then((body) => body.abi)

            await fs.writeJSON(cacheFilePath, { abi, timestamp })
          } catch (error) {
            try {
              // Attempt to read from cache if fetch fails.
              abi = (await fs.readJSON(cacheFilePath)).abi
            } catch {}
            if (!abi) throw error
          }
        }
        let contractName = contract.module
        if (contract.name) contractName = contract.name

        if (!abi) throw Error('Failed to fetch ABI for contract.')
        contracts.push({ abi, name: contractName })
      }
      return contracts
    },
    name,
  }
}

// /**
//  * Function for returning a request to fetch ABI from.
//  */
// request: (config: {}) =>
//   | { url: RequestInfo; init?: RequestInit | undefined }
//   | Promise<{ url: RequestInfo; init?: RequestInit | undefined }>
