import { petraWallet } from '@khizab/connectors'
import { createConfig } from '@khizab/core'
import { testnet } from 'khizab/networks'

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
})
