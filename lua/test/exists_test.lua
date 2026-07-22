-- EuVatValidation SDK exists test

local sdk = require("eu-vat-validation_sdk")

describe("EuVatValidationSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
