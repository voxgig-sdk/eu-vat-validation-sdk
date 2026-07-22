# EuVatValidation SDK utility: make_context
require_relative '../core/context'
module EuVatValidationUtilities
  MakeContext = ->(ctxmap, basectx) {
    EuVatValidationContext.new(ctxmap, basectx)
  }
end
