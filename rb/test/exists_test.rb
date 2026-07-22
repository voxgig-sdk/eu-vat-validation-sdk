# EuVatValidation SDK exists test

require "minitest/autorun"
require_relative "../EuVatValidation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EuVatValidationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
