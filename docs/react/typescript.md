<script setup>
import packageJson from '../../packages/react/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

Khizab is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases.
- Changes to types in this repository are considered non-breaking and are usually released as patch changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `khizab` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.
- The non-type-related public API of Khizab still follows semver very strictly.

To ensure everything works correctly, make sure your `tsconfig.json` has [`strict`](https://www.typescriptlang.org/tsconfig#strict) mode set to `true`.

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}
```
:::

## Config Types

By default React Context does not work well with type inference. To support strong type-safety across the React Context boundary, there are two options available:

- Declaration merging to "register" your `config` globally with TypeScript.
- `config` property to pass your `config` directly to hooks.

### Declaration Merging

[Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) allows you to "register" your `config` globally with TypeScript. The `Register` type enables Khizab to infer types in places that wouldn't normally have access to type info via React Context alone. 

To set this up, add the following declaration to your project. Below, we co-locate the declaration merging and the `config` set up.

```ts
import { createConfig } from 'khizab'
import { mainnet } from 'khizab/networks'

declare module 'khizab' { // [!code focus]
  interface Register { // [!code focus]
    config: typeof config // [!code focus]
  } // [!code focus]
} // [!code focus]

export const config = createConfig({
  network: mainnet
})
```

Since the `Register` type is global, you only need to add it once in your project. Once set up, you will get strong type-safety across your entire project. 

```ts twoslash
// @errors: 2322
import { type Config } from 'khizab'
import { mainnet } from 'khizab/networks'

declare module 'khizab' {
  interface Register {
    config: Config
  }
}
// ---cut---
import { useBlockByHeight } from 'khizab'

useBlockByHeight({ 
  height: 359251780,
  withTransactions: true
})
```

You just saved yourself a runtime error and you didn't even need to pass your `config`. 🎉

### Hook `config` Property

For cases where you have more than one Khizab `config` or don't want to use the declaration merging approach, you can pass a specific `config` directly to hooks via the `config` property.

```ts
import { createConfig } from 'khizab'
import { mainnet, testnet } from 'khizab/networks'

export const configA = createConfig({ // [!code focus]
  network: mainnet, // [!code focus]
}) // [!code focus]

export const configB = createConfig({ // [!code focus]
  network: testnet, // [!code focus]
}) // [!code focus]
```

As you expect, `network` is inferred correctly for each `config`.

```ts twoslash
// @errors: 2322
import { type Config } from 'khizab'

declare const configA: Config
declare const configB: Config
// ---cut---
import { useBlockByHeight } from 'khizab'


useBlockByHeight({ 
  height: 359251780,
  withTransactions: true,
  config: configA
})
useBlockByHeight({ 
  height: 359251780,
  withTransactions: true,
  config: configB
})
```

This approach is more explicit, but works well for advanced use-cases, if you don't want to use React Context or declaration merging, etc.

## Const-Assert ABIs & Typed Data

Khizab can infer types based on ABIs. This achieves full end-to-end type-safety from your contracts to your frontend and enlightened developer experience by autocompleting ABI item names, catching misspellings, inferring argument and return types, and more.

For this to work, you must either [const-assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ABIs . For example, `useReadContract`'s `abi` configuration parameter:

```ts
const abi = […] as const // <--- const assertion // [!code focus]
const { data } = useReadContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion or define the configuration parameter inline. Also, make sure your ABIs, and [TypeScript configuration](#requirements) are valid and set up correctly.

::: tip
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Khizab CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Aptos Blockchain, generate React Hooks, and more.
:::

Anywhere you see the `abi` configuration property, you can likely use const-asserted to get type-safety and inference. These properties are also called out in the docs.

Here's what [`useReadContract`](/react/api/hooks/useReadContract) looks like with const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
export const abi = {
  address: '0xd973c05d71a164eff27ece0abfb81e2174355ebcc5773d188a858020808639ab',
  name: 'advanced_todo_list',
  friends: [],
  exposed_functions: [
    {
      name: 'complete_todo',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer', 'u64', 'u64'],
      return: [],
    },
    {
      name: 'create_todo',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer', 'u64', '0x1::string::String'],
      return: [],
    },
    {
      name: 'create_todo_list',
      visibility: 'public',
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ['&signer'],
      return: [],
    },
    {
      name: 'get_todo',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', 'u64', 'u64'],
      return: ['0x1::string::String', 'bool'],
    },
    {
      name: 'get_todo_list',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', 'u64'],
      return: ['address', 'u64'],
    },
    {
      name: 'get_todo_list_by_todo_list_obj_addr',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address'],
      return: ['address', 'u64'],
    },
    {
      name: 'get_todo_list_counter',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address'],
      return: ['u64'],
    },
    {
      name: 'get_todo_list_obj_addr',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', 'u64'],
      return: ['address'],
    },
    {
      name: 'has_todo_list',
      visibility: 'public',
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ['address', 'u64'],
      return: ['bool'],
    },
  ],
  structs: [
    {
      name: 'Todo',
      is_native: false,
      is_event: false,
      abilities: ['copy', 'drop', 'store'],
      generic_type_params: [],
      fields: [
        {
          name: 'content',
          type: '0x1::string::String',
        },
        {
          name: 'completed',
          type: 'bool',
        },
      ],
    },
    {
      name: 'TodoList',
      is_native: false,
      is_event: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'owner',
          type: 'address',
        },
        {
          name: 'todos',
          type: 'vector<0xd973c05d71a164eff27ece0abfb81e2174355ebcc5773d188a858020808639ab::advanced_todo_list::Todo>',
        },
      ],
    },
    {
      name: 'UserTodoListCounter',
      is_native: false,
      is_event: false,
      abilities: ['key'],
      generic_type_params: [],
      fields: [
        {
          name: 'counter',
          type: 'u64',
        },
      ],
    },
  ],
} as const
// ---cut---
import { useReadContract } from 'khizab'

const { data } = useReadContract({
  abi,
  functionName: 'get_todo_list_counter',
  // ^?
  args: ['0x00000'],
  // ^?
})
data
// ^?
```
:::
