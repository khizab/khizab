# init

Creates configuration file. If TypeScript is detected, the config file will use TypeScript and be named `khizab.config.ts`. Otherwise, the config file will use JavaScript and be named `khizab.config.js`.

## Usage

```bash
khizab init 
```

## Options

### -c, --config \<path\>

`string`

Path to config file.

```bash
khizab init --config khizab.config.ts
```

### -r, --root \<path\>

`string`

Root path to resolve config from.

```bash
khizab init --root path/to/root
```

### -h, --help

Displays help message.

```bash
khizab init --help
```

