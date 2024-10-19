import { createConfig } from 'khizab'
import { testnet } from 'khizab/networks'
import { petraWallet } from 'khizab/connectors'

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
})
