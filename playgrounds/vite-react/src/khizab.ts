import { createConfig } from 'khizab'
import { testnet } from '@khizab/core/networks'
import { petraWallet } from '@khizab/connectors'

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
})

declare module 'khizab' {
  interface Register {
    config: typeof config
  }
}
