# create-khizab

## Overview

create-khizab is a command line interface (CLI) for scaffolding new Khizab projects.

## Usage

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

## Options

### `-t`, `--template`

By default, `create-khizab` scaffolds a basic Vite application with Khizab. However, you can specify a custom [template](#templates) by passing the `--template`/`-t` flag:

::: code-group
```bash [pnpm]
pnpm create khizab --template next
```
```bash [npm]
npm create khizab@latest --template next
```
```bash [yarn]
yarn create khizab --template next
```
```bash [bun]
bun create khizab --template next
```
:::

### `--bun`/`--npm`/`--pnpm`/`--yarn`

Use a specific package manager to install dependencies. By default, `create-khizab` will use the package manager you used to run the command.

### `-h`, `--help`

Prints the help message.

### `-v`, `--version`

Prints the CLI version.

## Templates

`create-khizab` currently comes with the following templates:

- `next`: A Next.js Khizab project.
- `vite-react` (default): A Vite (React) Khizab project.
- `vite-vanilla`: A Vite Khizab Core project.
