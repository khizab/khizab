# Why Khizab CLI

## The Problem

The most common way to interact with smart contracts is through Application Binary Interfaces. ABIs describe smart contracts' public functionality as well as how to encode and decode related data (e.g. arguments and results).

While ABIs are extremely powerful, there isn't a uniform way developers manage them in their apps. Developers do a bunch of different things, like:

- Publish packages on npm containing ABIs
- Write custom scripts to fetch ABIs from external sources
- Compile contracts into application project
- Copy and paste ABIs from local projects or block explorers

All these approaches take time that you could spend doing more important things, like interacting with your smart contracts!

## The Solution

The Khizab CLI is an attempt to automate manual work so you can build faster. In short, the CLI manages ABIs and generates code. It takes ABIs as inputs and outputs ABIs and generated code. 
Code generation is another big advantage of the CLI. Using the [React plugin](/cli/api/plugins/react), you can generate [Khizab Hooks](/react/api/hooks) for ABIs. When you combine this with the CLI's different ABI sources, you reduce a lot of boilerplate code.

::: code-group
```ts [Diff]
import { useReadContract, useWriteContract } from 'khizab' // [!code --]
import { todoListAbi } from './generated' // [!code --]
import { useReadTodoList, useWriteTodoList } from './generated' // [!code ++]

function App() {
  const { data } = useReadContract({ // [!code --]
  const { data } = useReadTodoList({ // [!code ++]
    abi: todoListAbi, // [!code --]
    functionName: 'get_todo_list_counter',
    args: ['0xa0f18535a2d899a57befc280c953cc4a46a9b75d1f5e20337941a5f01ee79138'],
  })

  const { write } = useWriteContract() // [!code --]
  const { write } = useWriteTodoList() // [!code ++]
  const onClick = React.useCallback(() => {
    write({
      abi: todoListAbi, // [!code --]
      functionName: 'create_todo_list',
      args: [],
    })
  }, [write])
}
```
```ts [Before]
import { useReadContract, useWriteContract } from 'khizab'
import { todoListAbi } from './generated'

function App() {
  const { data } = useReadContract({
    abi: todoListAbi,
    functionName: 'get_todo_list_counter',
    args: ['0xa0f18535a2d899a57befc280c953cc4a46a9b75d1f5e20337941a5f01ee79138'],
  })

  const { write } = useWriteContract()
  const onClick = React.useCallback(() => {
    write({
      abi: todoListAbi,
      functionName: 'create_todo_list',
      args: [],
    })
  }, [write])
}
```
```ts [After]
import { useReadTodoList, useWriteTodoList } from './generated'

function App() {
  const { data } = useReadTodoList({
    functionName: 'get_todo_list_counter',
    args: ['0xa0f18535a2d899a57befc280c953cc4a46a9b75d1f5e20337941a5f01ee79138'],
  })

  const { write } = useWriteTodoList()
  const onClick = React.useCallback(() => {
    write({
      functionName: 'create_todo_list',
      args: [],
    })
  }, [write])
}
```
:::
