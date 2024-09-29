import { BaseError } from './base.js'

export type KhizabProviderNotFoundErrorType = KhizabProviderNotFoundError & {
  name: 'KhizabProviderNotFoundError'
}
export class KhizabProviderNotFoundError extends BaseError {
  override name = 'KhizabProviderNotFoundError'
  constructor() {
    super('`useConfig` must be used within `KhizabProvider`.', {
      docsPath: 'https://khizab.sh/react/api/KhizabProvider',
    })
  }
}
