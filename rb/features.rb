# EuVatValidation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EuVatValidationFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuVatValidationBaseFeature.new
    when "test"
      EuVatValidationTestFeature.new
    else
      EuVatValidationBaseFeature.new
    end
  end
end
