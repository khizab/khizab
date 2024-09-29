import { NetworkName } from '../types/network.js'
import { defineNetwork } from './defineNetwork.js'

export const mainnet = defineNetwork({
  id: 1,
  name: NetworkName.MAINNET,
  rpcUrls: {
    default: ['https://api.mainnet.aptoslabs.com/v1'],
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer.aptoslabs.com/?network=mainnet',
    },
  },
  ensCollectionAddress:
    '0x63d26a4e3a8aeececf9b878e46bad78997fb38e50936efeabb2c4453f4d7f746',
})
