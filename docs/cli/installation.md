# Installation

Install Khizab CLI via your package manager.

## Package Manager

Install the required package.

::: code-group
```bash [pnpm]
pnpm add @khizab/cli
```

```bash [npm]
npm install @khizab/cli
```

```bash [yarn]
yarn add @khizab/cli
```

```bash [bun]
bun add @khizab/cli
```
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wevm/khizab/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add @khizab/cli@canary
```

```bash [npm]
npm install @khizab/cli@canary
```

```bash [yarn]
yarn add @khizab/cli@canary
```

```bash [bun]
bun add @khizab/cli@canary
```
:::

Or clone the [Khizab repo](https://github.com/khizab/khizab) to your local machine, build, and link it yourself.

```bash
git clone https://github.com/khizab/khizab.git
cd khizab
pnpm install
pnpm build
cd packages/cli
pnpm link --global
```

Then go to the project where you are using the Khizab CLI and run `pnpm link --global @khizab/cli` (or the package manager that you used to link Khizab CLI globally).
