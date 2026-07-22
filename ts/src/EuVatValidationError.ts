
import { Context } from './Context'


class EuVatValidationError extends Error {

  isEuVatValidationError = true

  sdk = 'EuVatValidation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EuVatValidationError
}

