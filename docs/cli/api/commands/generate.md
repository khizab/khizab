# generate

Generates code based on configuration, using `contracts` and `plugins`.

## Usage

```bash
khizab generate 
```

## Options

### -c, --config \<path\>

`string`

Path to config file.

```bash
khizab generate --config khizab.config.ts
```

### -r, --root \<path\>

`string`

Root path to resolve config from.

```bash
khizab generate --root path/to/root
```

### -w, --watch

`boolean`

Watch for changes (for plugins that support watch mode).

```bash
khizab generate --watch
```

### -h, --help

Displays help message.

```bash
khizab generate --help
```