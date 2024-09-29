import { NetworkName } from '../types/network.js'
import { defineNetwork } from './defineNetwork.js'

export const testnet = defineNetwork({
  id: 2,
  name: NetworkName.TESTNET,
  rpcUrls: {
    default: ['https://api.testnet.aptoslabs.com/v1'],
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer.aptoslabs.com/?network=testnet',
    },
  },
})
