# Getting Started

## Overview

Khizab CLI is a command line interface for managing ABIs, generating code (e.g. React Hooks), and much more. It makes working with abis easier by automating manual work so you can build faster. You can learn more about the rationale behind the project in the [Why Khizab CLI](/cli/why) section.

## Manual Installation

To manually add Khizab CLI to your project, install the required packages.

::: code-group
```bash [pnpm]
pnpm add -D @khizab/cli
```

```bash [npm]
npm install --save-dev @khizab/cli
```

```bash [yarn]
yarn add -D @khizab/cli
```

```bash [bun]
bun add -D @khizab/cli
```
:::

## Create Config File

Run the `init` command to generate a configuration file: either `khizab.config.ts` if TypeScript is detected, otherwise `khizab.config.js`. You can also create the configuration file manually. See [Configuring CLI](/cli/config/configuring-cli) for more info.

::: code-group
```bash [pnpm]
pnpm khizab init
```

```bash [npm]
npx khizab init
```

```bash [yarn]
yarn khizab init
```

```bash [bun]
bun khizab init
```
:::

The generated configuration file will look something like this:

::: code-group
```ts [khizab.config.ts]
import { defineConfig } from '@khizab/cli'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [],
})
```
:::

## Add Contracts And Plugins

Once the configuration file is set up, you can add contracts and plugins to it. These contracts and plugins are used to manage ABIs, generate code (React hooks, etc.), and much more!

For example, we can add ABI file, and the [`react`](/cli/api/plugins/react) plugins.

::: code-group
```ts{2,3,9-12,15-27,28} [khizab.config.ts]
import { defineConfig } from '@khizab/cli'
import { react } from '@khizab/cli/plugins'
import { abi } from './abi'
import { mainnet, sepolia } from 'khizab/chains'
 
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'TodoList',
      abi,
    },
  ],
  plugins: [
    react()
  ],
})
```
:::

## Run Code Generation

Now that we added a few contracts and plugins to the configuration file, we can run the [`generate`](/cli/api/commands/generate) command to resolve ABIs and generate code to the `out` file.

::: code-group
```bash [pnpm]
pnpm khizab generate
```

```bash [npm]
npx khizab generate
```

```bash [yarn]
yarn khizab generate
```

```bash [bun]
bun khizab generate
```
:::

In this example, the `generate` command will do the following:

- Validate the  `react` plugin
- Pull in the `./abi` file using the name `'TodoList'`
- Generate React Hooks for the ABI
- Save the ABI and React Hooks to the `out` file

## Use Generated Code

Once `out` is created, you can start using the generated code in your project.

```ts
import { useReadTodoList, useReadTodoListGetTodoListCounter } from './generated'

// Use the generated TodoList read hook
const { data } = useReadTodoList({
  functionName: 'get_todo_list_counter',
  args: ['0xa0f18535a2d899a57befc280c953cc4a46a9b75d1f5e20337941a5f01ee79138'],
})

// Use the generated TodoList "get_todo_list_counter" hook
const { data } = useReadTodoListGetTodoListCounter({
  args: ['0xa0f18535a2d899a57befc280c953cc4a46a9b75d1f5e20337941a5f01ee79138'],
})
```

::: tip
Instead of committing the `out` file, you likely want to add `out` to your `.gitignore` and run `generate` during the build process or before you start your dev server in a `"predev"` script.
:::

## Next Steps

For more information on what to do next, check out the following topics.

- [**Configuring CLI**](/cli/config/configuring-cli) Learn how to configure the CLI to work best for your project.
- [**Commands**](/cli/api/commands) Learn more about the CLI commands and how to use them.
- [**Plugins**](/cli/api/plugins) Browse the collection of plugins and set them up with your config.
