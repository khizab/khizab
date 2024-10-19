import { findUp } from 'find-up'
import { default as fs } from 'fs-extra'
import { resolve } from 'pathe'

// Do not reorder
// In order of preference files are checked
const configFiles = [
  'khizab.config.ts',
  'khizab.config.js',
  'khizab.config.mjs',
  'khizab.config.mts',
]

type FindConfigParameters = {
  /** Config file name */
  config?: string
  /** Config file directory */
  root?: string
}

/**
 * Resolves path to khizab CLI config file.
 */
export async function findConfig(parameters: FindConfigParameters = {}) {
  const { config, root } = parameters
  const rootDir = resolve(root || process.cwd())
  if (config) {
    const path = resolve(rootDir, config)
    if (fs.pathExistsSync(path)) return path
    return
  }
  return findUp(configFiles, { cwd: rootDir })
}
