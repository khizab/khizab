import { glob } from 'glob'

// Updates aptos sdk version in Vitest snapshots, etc.

console.log('Updating Aptos sdk version.')

const file = Bun.file('package.json')
const packageJson = await file.json()
const aptosSdkVersion = packageJson.devDependencies['@aptos-labs/ts-sdk']

// Update Vitest snapshots
// Get all *.test.ts files
const testPaths = await glob('packages/**/*.test.ts', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const testPath of testPaths) {
  const file = Bun.file(testPath)
  const testFile = await file.text()

  // Skip files that don't contain aptos sdk version
  if (!testFile.includes('Version: @aptos-labs/ts-sdk@')) continue
  // Skip files that contain current version
  if (testFile.includes(`Version: @aptos-labs/ts-sdk@${aptosSdkVersion}`))
    continue

  console.log(testPath)
  const updatedTestFile = testFile.replace(
    /Version: @aptos-labs\/ts-sdk@[A-Za-z0-9\-\.]+/g,
    `Version: @aptos-labs\/ts-sdk@${aptosSdkVersion}`,
  )
  await Bun.write(testPath, updatedTestFile)

  count += 1
}

console.log(`Done. Updated ${count} ${count === 1 ? 'file' : 'files'}.`)
