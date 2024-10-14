<script setup>
import packageJson from '../../packages/react/package.json'

const aptosSdkVersion = packageJson.peerDependencies["@aptos-labs/ts-sdk"]
</script>

# Getting Started

## Overview

Khizab is a React Hooks library for Aptos. You can learn more about the rationale behind the project in the [Why Khizab](/react/why) section.

## Automatic Installation

For new projects, it is recommended to set up your Khizab app using the [`create-khizab`](/cli/create-khizab) command line interface (CLI). This will create a new Khizab project using TypeScript and install the required dependencies.

::: code-group
```bash [pnpm]
pnpm create khizab
```

```bash [npm]
npm create khizab@latest
```

```bash [yarn]
yarn create khizab
```

```bash [bun]
bun create khizab
```
:::

Once the command runs, you'll see some prompts to complete.

```
Project name: khizab-project
Select a framework: React / Vanilla
...
```

After the prompts, `create-khizab` will create a directory with your project name and install the required dependencies. Check out the `README.md` for further instructions (if required).

## Manual Installation

To manually add Khizab to your project, install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add khizab @aptos-labs/ts-sdk@{{aptosSdkVersion}} @tanstack/react-query
```

```bash-vue [npm]
npm install khizab @aptos-labs/ts-sdk@{{aptosSdkVersion}} @tanstack/react-query
```

```bash-vue [yarn]
yarn add khizab @aptos-labs/ts-sdk@{{aptosSdkVersion}} @tanstack/react-query
```

```bash-vue [bun]
bun add khizab @aptos-labs/ts-sdk@{{aptosSdkVersion}} @tanstack/react-query
```
:::

- [Aptos Sdk](https://github.com/aptos-labs/aptos-ts-sdk) is an SDK for accessing the Aptos blockchain data, submitting transactions, and more!.
- [TanStack Query](https://tanstack.com/query/v5) is an async state manager that handles requests, caching, and more.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

### Create Config

Create and export a new Khizab config using `createConfig`.

::: code-group
<<< @/snippets/react/config.ts[config.ts]
:::

In this example, Khizab is configured to use the testnet network, and `petra` connector. Check out the [`createConfig` docs](/react/api/createConfig) for more configuration options.


::: details TypeScript Tip
If you are using TypeScript, you can "register" the Khizab config or use the hook `config` property to get strong type-safety across React Context in places that wouldn't normally have type info.

::: code-group
```ts twoslash [register config]
// @errors: 2322
import { type Config } from 'khizab'

declare const config: Config
// ---cut---
import { useBlockByHeight } from 'khizab'

useBlockByHeight({ 
  height: 359251780,
  withTransactions: true
})

declare module 'khizab' {
  interface Register {
    config: typeof config
  }
}
```
:::

### Wrap App in Context Provider

Wrap your app in the `KhizabProvider` React Context Provider and pass the `config` you created earlier to the `value` property.

::: code-group
```tsx [app.tsx]
import { KhizabProvider } from 'khizab' // [!code focus]
import { config } from './config' // [!code focus]

function App() {
  return (
    <KhizabProvider config={config}> // [!code focus]
      {/** ... */} // [!code focus]
    </KhizabProvider> // [!code focus]
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [`KhizabProvider` docs](/react/api/KhizabProvider) to learn more about React Context in Khizab.

### Setup TanStack Query

Inside the `KhizabProvider`, wrap your app in a TanStack Query React Context Provider, e.g. `QueryClientProvider`, and pass a new `QueryClient` instance to the `client` property.

::: code-group
```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // [!code focus]
import { KhizabProvider } from 'khizab'
import { config } from './config'

const queryClient = new QueryClient() // [!code focus]

function App() {
  return (
    <KhizabProvider config={config}>
      <QueryClientProvider client={queryClient}> // [!code focus]
        {/** ... */} // [!code focus]
      </QueryClientProvider> // [!code focus]
    </KhizabProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

Check out the [TanStack Query docs](https://tanstack.com/query/v5/docs/react) to learn about the library, APIs, and more.

### Use Khizab

Now that everything is set up, every component inside the Khizab and TanStack Query Providers can use Khizab React Hooks.

::: code-group
```tsx [profile.tsx]
import { useAccount } from 'khizab'

function Profile() {
  const { address } = useAccount()
  const {data, error, isPending } = useGetAccountInfo({accountAddress: address?.address! })
  if (status === 'pending') return <div>Loading Account Info</div>
  if (status === 'error')
    return <div>Error fetching Account Info: {error.message}</div>
  return <div>Sequence Number: {data.sequence_number}</div>
}
```

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { KhizabProvider } from 'khizab'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <KhizabProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </KhizabProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/react/typescript) Learn how to get the most out of Khizab's type-safety and inference for an enlightened developer experience.
- [**Connect Wallet**](/react/guides/connect-wallet) Learn how to enable wallets to connect to and disconnect from your apps and display information about connected accounts.
- [**React Hooks**](/react/api/hooks) Browse the collection of React Hooks and learn how to use them.
- [Aptos Sdk](/react/guides/aptos-sdk) Learn about Aptos Sdk and how it works with Khizab.
