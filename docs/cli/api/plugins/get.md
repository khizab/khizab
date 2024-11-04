# get

Plugin for getting and parsing ABIs from Aptos network.

## Import

```ts
import { get } from '@khizab/cli/plugins'
```

## Usage

```ts{2,6-23}
import { defineConfig } from '@khizab/cli'
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      contracts: [
        {
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ],
    }),
  ],
})
```


## Configuration

### network

`Network.TESTNET | Network.MAINNET | Network.DEVNET | undefined`

- Network to get ABIs from
- Defaults to `'Network.MAINNET'`.

```ts{1}
import { defineConfig, Network } from '@khizab/cli' // [!code focus]
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      network:  Network.TESTNET, // [!code focus]
      contracts: [
        {
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ]
    }),
  ],
})
```

```ts
import { type GetConfig } from '@khizab/cli/plugins'
```

### cacheDuration

`number | undefined`

- Duration in milliseconds to cache ABIs.
- Defaults to `1_800_000` (30 minutes).

```ts
import { defineConfig } from '@khizab/cli'
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      cacheDuration: 300_000, // [!code focus]
      contracts: [
        {
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ],
    }),
  ],
})
```

### contracts

`{ name?: string; address: 0x${string}; module: string }[]`

name is optional, use it if you want to override the module name in generated code

Contracts to get ABIs for.

```ts
import { defineConfig } from '@khizab/cli'
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      contracts: [ // [!code focus]
        { // [!code focus]
          name: 'inc', //optional // [!code focus]
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d', // [!code focus]
          module: 'increase', // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    }),
  ],
})

```

### getCacheKey

`((config: { contract: { address: name?: string, address: 0x${string}, module: string } }) => string) | undefined`

- Function for creating a cache key for contract. Contract data is cached at `~/.khizab-cli/plugins/get/cache/`.
- Defaults to `${contract.address}__${contract.module}${contract.name ? __${contract.name} : ''}`.

```ts
import { defineConfig } from '@khizab/cli'
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      contracts: [
        {
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ],
      getCacheKey({ contract }) { // [!code focus]
        return `${contract.address}:${contract.module}` // [!code focus]
      }, // [!code focus]
    }),
  ],
})

```

### name

`string`

- Name of your collection.
- Defaults to `'Get'`.

```ts
import { defineConfig } from '@khizab/cli'
import { get } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    get({
      contracts: [
        {
          address: '0x99f1f75c37ad8f455c4af147494c49d8122e37bb5b7544d4b320ddb1c9a9106d',
          module: 'increase',
        },
      ],
      name: 'FooApp', // [!code focus]
    }),
  ],
})
```
