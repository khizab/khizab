# Configuring CLI

When running `khizab` from the command line, `@khizab/cli` will automatically try to resolve a config file named `khizab.config.js` or `khizab.config.ts` inside the project root. The most basic config file looks like this:

::: code-group
```js [khizab.config.js]
export default {
  // config options
}
```
:::

Note `@khizab/cli` supports using ES modules syntax in the config file even if the project is not using native Node ESM, e.g. `"type": "module"` in package.json. In this case, the config file is auto pre-processed before load.

You can also explicitly specify a config file to use with the `--config`/`-c` CLI option (resolved relative to the current directory):

```bash
khizab --config my-config.js
```

To scaffold a config file quickly, check out the [`init`](/cli/api/commands/init) command.

## Config Intellisense

Since Khizab CLI ships with TypeScript typings, you can use your editor's intellisense with [JSDoc](https://jsdoc.app) type hints:

::: code-group
```js [khizab.config.js]
/** @type {import('@khizab/cli').Config} */
export default {
  // ...
}
```
:::

Alternatively, you can use the `defineConfig` utility which should provide intellisense without the need for JSDoc annotations:

::: code-group
```js [khizab.config.js]
import { defineConfig } from '@khizab/cli'

export default defineConfig({
  // ...
})
```
:::

Khizab CLI also directly supports TypeScript config files. You can use `khizab.config.ts` with the `defineConfig` helper as well.

## Conditional Config

If the config needs to conditionally determine options based on the environment, it can export a function instead:

::: code-group
```js [khizab.config.js]
export default defineConfig(() => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      // dev specific config
    }
  } else {
    return {
      // production specific config
    }
  }
})
```
:::

## Async Config

If the config needs to call async function, it can export a async function instead:

::: code-group
```js [khizab.config.js]
export default defineConfig(async () => {
  const data = await asyncFunction()
  return {
    // ...
  }
})
```
:::

This can be useful for resolving external resources from the network or filesystem that are required for configuration ahead of running a command.

## Array Config

The config can also be represented either as a pre-defined array or returned as an array from a function:

::: code-group
```js [khizab.config.js]
export default defineConfig([
  {
  // config 1
  },
  {
  // config 2
  },
])
```
:::

## Environment Variables

Environmental Variables can be obtained from `process.env` as usual.

Note that Khizab CLI doesn't load `.env` files by default as the files to load can only be determined after evaluating the config. However, you can use the exported `loadEnv` utility to load the specific `.env` files if needed.

::: code-group
```js [khizab.config.js]
import { defineConfig, loadEnv } from '@khizab/cli'

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  })
  return {
    // ...
  }
})
```
:::