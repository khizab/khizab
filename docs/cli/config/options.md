# Config Options

Configuration options for Khizab CLI.

## contracts

`ContractConfig[] | undefined`

Array of contracts to use when running [commands](/cli/api/commands). `abi` and `name` are required, all other properties are optional.

### abi

`Abi`

ABI for contract. Used by [plugins](/cli/api/plugins) to generate code base on properties.

::: code-group
```ts {5} [khizab.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: { … },
      name: 'MyCoolContract'
    },
  ],
}
```
:::

### name

`string`

Name of contract. Must be unique. Used by [plugins](/cli/api/plugins) to name generated code.

::: code-group
```ts {6} [khizab.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: { … },
      name: 'MyCoolContract'
    },
  ],
}
```
:::

## out

`string`

Path to output generated code. Must be unique per config. Use an [Array Config](/cli/config/configuring-cli#array-config) for multiple outputs.

::: code-group
```ts {2} [khizab.config.ts]
export default {
  out: 'src/generated.ts',
  contracts: [
    {
      abi: { … },
      name: 'MyCoolContract'
    },
  ],
}
```
:::

## plugins

`Plugin[] | undefined`

Plugins to use and their configuration.

Khizab CLI has multiple [built-in plugins](/cli/api/plugins) that are used to manage ABIs, generate code, etc.

::: code-group
```ts {1,5-20} [khizab.config.ts]
import { react } from '@khizab/cli/plugins'

export default {
  out: 'src/generated.js',
  plugins: [
    react(),
  ],
}
```
:::
