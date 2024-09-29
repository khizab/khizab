import { BaseError as CoreError } from '@khizab/core'

import { getVersion } from '../utils/getVersion.js'

export type BaseErrorType = BaseError & { name: 'KhizabError' }
export class BaseError extends CoreError {
  override name = 'KhizabError'
  override get docsBaseUrl() {
    return 'https://khizab.sh/react'
  }
  override get version() {
    return getVersion()
  }
}
