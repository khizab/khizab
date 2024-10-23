import { pascalCase } from 'change-case'

import { type Contract, type Plugin } from '../config.js'
import { type Evaluate, type RequiredBy } from '../types.js'

export type ReactConfig = {
  getHookName?: (options: {
    contractName: string
    itemName?: string | undefined
    type: 'read' | 'write'
  }) => `use${string}`
}

type ReactResult = Evaluate<RequiredBy<Plugin, 'run'>>

export function react(config: ReactConfig = {}): ReactResult {
  return {
    name: 'React',
    async run({ contracts }) {
      const imports = new Set<string>([])
      const content: string[] = []
      const pure = '/*#__PURE__*/'

      const hookNames = new Set<string>()
      for (const contract of contracts) {
        let hasReadFunction = false
        let hasWriteFunction = false
        const readItems = []
        const writeItems = []
        for (const item of contract.abi.exposed_functions) {
          if (item.is_view) {
            hasReadFunction = true
            readItems.push(item)
          }
          if (item.is_entry) {
            hasWriteFunction = true
            writeItems.push(item)
          }
        }

        const innerContent = `abi: ${contract.meta.abiName}`

        if (hasReadFunction) {
          const hookName = getHookName(config, hookNames, 'read', contract.name)
          const docString = genDocString('useReadContract', contract)
          const functionName = 'createUseReadContract'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${hookName} = ${pure} ${functionName}({ ${innerContent} })`,
          )

          const names = new Set<string>()
          for (const item of readItems) {
            if (!item.is_view) continue

            // Skip overrides since they are captured by same hook
            if (names.has(item.name)) continue
            names.add(item.name)

            const hookName = getHookName(
              config,
              hookNames,
              'read',
              contract.name,
              item.name,
            )
            const docString = genDocString('useReadContract', contract, {
              name: 'functionName',
              value: item.name,
            })
            content.push(
              `${docString}
export const ${hookName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
            )
          }
        }

        if (hasWriteFunction) {
          {
            const hookName = getHookName(
              config,
              hookNames,
              'write',
              contract.name,
            )
            const docString = genDocString('useWriteContract', contract)
            const functionName = 'createUseWriteContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${hookName} = ${pure} ${functionName}({ ${innerContent} })`,
            )

            const names = new Set<string>()
            for (const item of writeItems) {
              if (!item.is_entry) continue

              // Skip overrides since they are captured by same hook
              if (names.has(item.name)) continue
              names.add(item.name)

              const hookName = getHookName(
                config,
                hookNames,
                'write',
                contract.name,
                item.name,
              )
              const docString = genDocString('useWriteContract', contract, {
                name: 'functionName',
                value: item.name,
              })
              content.push(
                `${docString}
export const ${hookName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
              )
            }
          }
        }
      }

      const importValues = [...imports.values()]

      return {
        imports: importValues.length
          ? `import { ${importValues.join(', ')} } from 'khizab/codegen'\n`
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}

function genDocString(
  hookName: string,
  contract: Contract,
  item?: { name: string; value: string },
) {
  let description = `Wraps __{@link ${hookName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__`
  if (item) description += ` and \`${item.name}\` set to \`"${item.value}"\``

  return `/**
 * ${description}
 */`
}

function getHookName(
  config: ReactConfig,
  hookNames: Set<string>,
  type: 'read' | 'write',
  contractName: string,
  itemName?: string | undefined,
) {
  const ContractName = pascalCase(contractName)
  const ItemName = itemName ? pascalCase(itemName) : undefined

  let hookName
  if (typeof config.getHookName === 'function')
    hookName = config.getHookName({
      type,
      contractName: ContractName,
      itemName: ItemName,
    })
  else if (typeof config.getHookName === 'string') {
    switch (type) {
      case 'read':
        hookName = `use${ContractName}${ItemName ?? 'Read'}`
        break
      case 'write':
        hookName = `use${ContractName}${ItemName ?? 'Write'}`
        break
    }
  } else {
    hookName = `use${pascalCase(type)}${ContractName}${ItemName ?? ''}`
  }

  if (hookNames.has(hookName))
    throw new Error(
      `Hook name "${hookName}" must be unique for contract "${contractName}". Try using \`getHookName\` to create a unique name.`,
    )

  hookNames.add(hookName)
  return hookName
}
