import { NetworkName } from '../types/network.js'
import { defineNetwork } from './defineNetwork.js'

export const devnet = defineNetwork({
  id: 125,
  name: NetworkName.DEVNET,
  rpcUrls: {
    default: ['https://fullnode.devnet.aptoslabs.com/v1'],
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer.aptoslabs.com/?network=devnet',
    },
  },
})
