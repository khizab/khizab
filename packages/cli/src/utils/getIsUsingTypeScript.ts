import { findUp } from 'find-up'

export async function getIsUsingTypeScript() {
  try {
    const cwd = process.cwd()
    const tsconfig = await findUp('tsconfig.json', { cwd })
    if (tsconfig) return true

    const khizabConfig = await findUp(
      ['khizab.config.ts', 'khizab.config.mts'],
      {
        cwd,
      },
    )
    if (khizabConfig) return true

    return false
  } catch {
    return false
  }
}
