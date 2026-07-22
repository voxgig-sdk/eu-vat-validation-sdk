-- EuVatValidation SDK error

local EuVatValidationError = {}
EuVatValidationError.__index = EuVatValidationError


function EuVatValidationError.new(code, msg, ctx)
  local self = setmetatable({}, EuVatValidationError)
  self.is_sdk_error = true
  self.sdk = "EuVatValidation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EuVatValidationError:error()
  return self.msg
end


function EuVatValidationError:__tostring()
  return self.msg
end


return EuVatValidationError
