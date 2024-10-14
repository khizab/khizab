<script setup>
import packageJson from '../../packages/core/package.json'

const aptosSdkVersion = packageJson.peerDependencies["@aptos-labs/ts-sdk"]
</script>

# Getting Started

## Overview

Khizab Core is a VanillaJS library for Aptos. You can learn more about the rationale behind the project in the [Why Khizab](/core/why) section.

## Manual Installation

To manually add Khizab to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @khizab/core @khizab/connectors @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [npm]
npm install @khizab/core @khizab/connectors @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [yarn]
yarn add @khizab/core @khizab/connectors @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [bun]
bun add @khizab/core @khizab/connectors @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```
:::

- [Khizab Connectors](/core/api/connectors) is a collection of interfaces for linking wallets to Khizab.
- [Aptos Sdk](https://github.com/aptos-labs/aptos-ts-sdk) is an SDK for accessing the Aptos blockchain data, submitting transactions, and more!.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/core/typescript).

### Create Config

Create and export a new Khizab config using `createConfig`.

::: code-group
<<< @/snippets/core/config.ts[config.ts]
:::

In this example, Khizab is configured to use the Testnet network. Check out the [`createConfig` docs](/core/api/createConfig) for more configuration options.

### Use Khizab

Now that everything is set up, you can pass the `config` to use actions.

::: code-group
```tsx [index.ts]
import { getAccount } from '@khizab/core'
import { config } from './config'

const { address } = getAccount(config)
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/core/typescript) Learn how to get the most out of Khizab's type-safety and inference for an enlightened developer experience.
- [**Actions**](/core/api/actions) Browse the collection of actions and learn how to use them.
- [**Framework Adapters**](/core/guides/framework-adapters) Learn how to create a Khizab-like adapter for your favorite framework.
- [**Aptos Sdk**](https://github.com/aptos-labs/aptos-sdk) Khizab Core is a wrapper around Aptos Sdk that is being used to access the Aptos blockchain. Learn more about Aptos Sdk and how to use it.
