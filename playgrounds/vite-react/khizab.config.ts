import { Network, defineConfig } from '@khizab/cli'
import { fetch, react } from '@khizab/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    fetch({
      network: Network.TESTNET,
      contracts: [
        {
          address:
            '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ],
    }),
    react(),
  ],
})
