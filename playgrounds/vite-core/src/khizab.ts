import { petraWallet, pontemWallet, martianWallet } from '@khizab/connectors'
import { createConfig, createStorage } from '@khizab/core'
import { testnet } from '@khizab/core/networks'

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet(), pontemWallet(), martianWallet()],
  storage: createStorage({ storage: localStorage, key: 'vite-core-app' }),
})
