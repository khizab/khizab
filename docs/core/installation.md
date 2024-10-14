<script setup>
import packageJson from '../../packages/core/package.json'

const aptosSdkVersion = packageJson.peerDependencies["@aptos-labs/ts-sdk"]
const version = packageJson.version
</script>

# Installation

Install Khizab Core via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

::: code-group
```bash-vue [pnpm]
pnpm add @khizab/core @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [npm]
npm install @khizab/core @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [yarn]
yarn add @khizab/core @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```

```bash-vue [bun]
bun add @khizab/core @aptos-labs/ts-sdk@{{aptosSdkVersion}}
```
:::

- [Aptos Sdk](https://github.com/aptos-labs/aptos-ts-sdk) is an SDK for accessing the Aptos blockchain data, submitting transactions, and more!.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/react/typescript).

## CDN

If you're not using a package manager, you can also use Khizab Core via an ESM-compatible CDN such as [esm.sh](https://esm.sh). Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content.

```html-vue
<script type="module">
  import { createConfig } from 'https://esm.sh/@khizab/core@{{version}}'
  import { testnet } from 'https://esm.sh/@khizab/connectors'
</script>
```

Check out the React docs for info on how to use [React without JSX](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

## Requirements

Khizab Core is optimized for modern browsers. It is compatible with the following browsers.

- Chrome 64+
- Edge 79+
- Firefox 67+
- Opera 51+
- Safari 12+

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/khizab/khizab/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add @khizab/core@canary
```

```bash [npm]
npm install @khizab/core@canary
```

```bash [yarn]
yarn add @khizab/core@canary
```

```bash [bun]
bun add @khizab/core@canary
```
:::

Or clone the [Khizab repo](https://github.com/khizab/khizab) to your local machine, build, and link it yourself.

```bash
gh repo clone khizab/khizab
cd khizab
pnpm install
pnpm build
cd packages/core
pnpm link --global
```

Then go to the project where you are using Khizab and run `pnpm link --global @khizab/core` (or the package manager that you used to link Khizab globally). Make sure you installed the [required peer dependencies](/core/getting-started#manual-installation) and their versions are correct.
