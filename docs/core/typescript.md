<script setup>
import packageJson from '../../packages/core/package.json'

const typescriptVersion = packageJson.peerDependencies.typescript
</script>

# TypeScript

## Requirements

Khizab Core is designed to be as type-safe as possible! Things to keep in mind:

- Types currently require using TypeScript {{typescriptVersion}}.
- Changes to types in this repository are considered non-breaking and are usually released as patch  changes (otherwise every type enhancement would be a major version!).
- It is highly recommended that you lock your `@khizab/core` and `typescript` versions to specific patch releases and upgrade with the expectation that types may be fixed or upgraded between any release.

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

## Const-Assert ABIs & Typed Data

Khizab Core can infer types based on ABIs. This achieves full end-to-end type-safety from your contracts to your frontend and enlightened developer experience by autocompleting ABI item names, catching misspellings, inferring argument and return types (including overloads), and more.

For this to work, you must either [const-assert](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) ABIs. For example, `useReadContract`'s `abi` configuration parameter:

```ts
const abi = […] as const // <--- const assertion // [!code focus]
const result = readContract({ abi })
```

If type inference isn't working, it's likely you forgot to add a `const` assertion. Also, make sure your ABIs, and [TypeScript configuration](#requirements) are valid and set up correctly.

::: tip
Unfortunately [TypeScript doesn't support importing JSON `as const` yet](https://github.com/microsoft/TypeScript/issues/32063). Check out the [Khizab CLI](/cli/getting-started) to help with this! It can automatically fetch ABIs from Aptos blochain.
:::

Anywhere you see the `abi`  configuration property, you can likely use const-asserted to get type-safety and inference. These properties are also called out in the docs.

Here's what [`readContract`](/core/api/actions/readContract) looks like with a const-asserted `abi` property.

::: code-group
```ts twoslash [Const-Asserted]
import { createConfig } from '@khizab/core'
import { testnet } from '@khizab/core/networks'
import { petraWallet } from '@khizab/connectors'

const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
})

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
import { readContract } from '@khizab/core'

const result = await readContract(config, {
  abi,
  functionName: 'get_todo_list_counter',
  // ^?
  args: ['0x000000'],
  // ^?
})
result
// ^?
```
:::
