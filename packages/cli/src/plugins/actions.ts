import { pascalCase } from 'change-case'

import { type Contract, type Plugin } from '../config.js'
import { type Evaluate, type RequiredBy } from '../types.js'
import { getIsPackageInstalled } from '../utils/packages.js'

export type ActionsConfig = {
  getActionName?: (options: {
    contractName: string
    itemName?: string | undefined
    type: 'read' | 'write'
  }) => string
  overridePackageName?: '@khizab/core' | 'khizab' | undefined
}

type ActionsResult = Evaluate<RequiredBy<Plugin, 'run'>>

export function actions(config: ActionsConfig = {}): ActionsResult {
  return {
    name: 'Action',
    async run({ contracts }) {
      const imports = new Set<string>([])
      const content: string[] = []
      const pure = '/*#__PURE__*/'

      const actionNames = new Set<string>()
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

        let innerContent
        if (contract.meta.addressName)
          innerContent = `abi: ${contract.meta.abiName}, address: ${contract.meta.addressName}`
        else innerContent = `abi: ${contract.meta.abiName}`

        if (hasReadFunction) {
          const actionName = getActionName(
            config,
            actionNames,
            'read',
            contract.name,
          )
          const docString = genDocString('readContract', contract)
          const functionName = 'createReadContract'
          imports.add(functionName)
          content.push(
            `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
          )

          const names = new Set<string>()
          for (const item of readItems) {
            if (!item.is_view) continue

            // Skip overrides since they are captured by same hook
            if (names.has(item.name)) continue
            names.add(item.name)

            const hookName = getActionName(
              config,
              actionNames,
              'read',
              contract.name,
              item.name,
            )
            const docString = genDocString('readContract', contract, {
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
            const actionName = getActionName(
              config,
              actionNames,
              'write',
              contract.name,
            )
            const docString = genDocString('writeContract', contract)
            const functionName = 'createWriteContract'
            imports.add(functionName)
            content.push(
              `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent} })`,
            )

            const names = new Set<string>()
            for (const item of writeItems) {
              if (!item.is_entry) continue

              // Skip overrides since they are captured by same hook
              if (names.has(item.name)) continue
              names.add(item.name)

              const actionName = getActionName(
                config,
                actionNames,
                'write',
                contract.name,
                item.name,
              )
              const docString = genDocString('writeContract', contract, {
                name: 'functionName',
                value: item.name,
              })
              content.push(
                `${docString}
export const ${actionName} = ${pure} ${functionName}({ ${innerContent}, functionName: '${item.name}' })`,
              )
            }
          }
        }
      }

      const importValues = [...imports.values()]

      let packageName = '@khizab/core/codegen'
      if (config.overridePackageName) {
        switch (config.overridePackageName) {
          case '@khizab/core':
            packageName = '@khizab/core/codegen'
            break
          case 'khizab':
            packageName = 'khizab/codegen'
            break
        }
      } else if (await getIsPackageInstalled({ packageName: 'khizab' }))
        packageName = 'khizab/codegen'
      else if (await getIsPackageInstalled({ packageName: '@khizab/core' }))
        packageName = '@khizab/core/codegen'

      return {
        imports: importValues.length
          ? `import { ${importValues.join(', ')} } from '${packageName}'\n`
          : '',
        content: content.join('\n\n'),
      }
    },
  }
}

function genDocString(
  actionName: string,
  contract: Contract,
  item?: { name: string; value: string },
) {
  let description = `Wraps __{@link ${actionName}}__ with \`abi\` set to __{@link ${contract.meta.abiName}}__`
  if (item) description += ` and \`${item.name}\` set to \`"${item.value}"\``

  const docString = ' doc string address '
  if (docString)
    return `/**
 * ${description}
 * 
 ${docString}
 */`

  return `/**
 * ${description}
 */`
}

function getActionName(
  config: ActionsConfig,
  actionNames: Set<string>,
  type: 'read' | 'write',
  contractName: string,
  itemName?: string | undefined,
) {
  const ContractName = pascalCase(contractName)
  const ItemName = itemName ? pascalCase(itemName) : undefined

  let actionName
  if (typeof config.getActionName === 'function')
    actionName = config.getActionName({
      type,
      contractName: ContractName,
      itemName: ItemName,
    })
  else {
    actionName = `${type}${ContractName}${ItemName ?? ''}`
  }

  if (actionNames.has(actionName))
    throw new Error(
      `Action name "${actionName}" must be unique for contract "${contractName}". Try using \`getActionName\` to create a unique name.`,
    )

  actionNames.add(actionName)
  return actionName
}
