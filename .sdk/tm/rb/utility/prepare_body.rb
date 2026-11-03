# EuVatValidation SDK utility: prepare_body
require_relative 'media'
module EuVatValidationUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EuVatValidationUtilities.raw_body(ctx.reqdata) if EuVatValidationUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
