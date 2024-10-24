# Plugins

Plugins for managing ABIs, generating code, and more.

## Import

Import via the `'@khizab/cli/plugins'` entrypoint.

```ts
import { react } from '@khizab/cli/plugins'
```

## Available Plugins

- [`actions`](/cli/api/plugins/actions) Generate type-safe VanillaJS actions from configuration `contracts`.
- [`react`](/cli/api/plugins/react) Generate type-safe React Hooks from configuration `contracts`.

## Create Plugin

Creating plugins to hook into the CLI is quite simple. Plugins most commonly  generate code using the `run` option, e.g. [`react`](/cli/api/plugins/react). All you need to do is write a function that returns the `Plugin` type.

```ts{3-8}
import { type Plugin, defineConfig } from '@khizab/cli'

function myPlugin(): Plugin {
  // `name` is the only required property.
  name: 'MyPlugin',
  // You likely want to at least include `contracts` or `run`.
  // ...
}

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [myPlugin()],
})
```
