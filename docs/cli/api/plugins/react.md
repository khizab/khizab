# react

Plugin for generating type-safe [Khizab Hooks](/react/api/hooks).

## Import

```ts
import { react } from '@khizab/cli/plugins'
```

## Usage

```ts{2,6}
import { defineConfig } from '@khizab/cli'
import { react } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    react(),
  ],
})
```

## Configuration

```ts
import { type ReactConfig } from '@khizab/cli/plugins'
```

### getHookName

``((options: { contractName: string; type: 'read' | 'write' }) => `use${string}`) ``

- Function for setting custom hook names.
- Defaults to `` `use${type}${contractName}` ``. For example, `useReadCoin`, `useWriteCoin`.

```ts
import { defineConfig } from '@khizab/cli'
import { react } from '@khizab/cli/plugins'

export default defineConfig({
  plugins: [
    react({
      getHookName({ contractName, type }) { // [!code focus]
        return `use${contractName}__${type}` // [!code focus]
      }, // [!code focus]
    }),
  ],
})
```

