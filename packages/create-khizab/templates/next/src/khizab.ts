import { createConfig } from 'khizab'
import { mainnet } from 'khizab/networks'
import { petraWallet } from 'khizab/connectors'

export const config = createConfig({
  network: mainnet,
  connectors: [petraWallet()],
  ssr: true,
})
