# EuVatValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EuVatValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuVatValidationBaseFeature.new
    when "ratelimit"
      EuVatValidationRatelimitFeature.new
    when "retry"
      EuVatValidationRetryFeature.new
    when "test"
      EuVatValidationTestFeature.new
    when "timeout"
      EuVatValidationTimeoutFeature.new
    else
      EuVatValidationBaseFeature.new
    end
  end
end
