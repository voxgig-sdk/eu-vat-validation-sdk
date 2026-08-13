# EuVatValidation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EuVatValidationUtility.registrar = ->(u) {
  u.clean = EuVatValidationUtilities::Clean
  u.done = EuVatValidationUtilities::Done
  u.make_error = EuVatValidationUtilities::MakeError
  u.feature_add = EuVatValidationUtilities::FeatureAdd
  u.feature_hook = EuVatValidationUtilities::FeatureHook
  u.feature_init = EuVatValidationUtilities::FeatureInit
  u.fetcher = EuVatValidationUtilities::Fetcher
  u.make_fetch_def = EuVatValidationUtilities::MakeFetchDef
  u.make_context = EuVatValidationUtilities::MakeContext
  u.make_options = EuVatValidationUtilities::MakeOptions
  u.make_request = EuVatValidationUtilities::MakeRequest
  u.make_response = EuVatValidationUtilities::MakeResponse
  u.make_result = EuVatValidationUtilities::MakeResult
  u.make_point = EuVatValidationUtilities::MakePoint
  u.make_spec = EuVatValidationUtilities::MakeSpec
  u.make_url = EuVatValidationUtilities::MakeUrl
  u.param = EuVatValidationUtilities::Param
  u.prepare_auth = EuVatValidationUtilities::PrepareAuth
  u.prepare_body = EuVatValidationUtilities::PrepareBody
  u.prepare_headers = EuVatValidationUtilities::PrepareHeaders
  u.prepare_method = EuVatValidationUtilities::PrepareMethod
  u.prepare_params = EuVatValidationUtilities::PrepareParams
  u.prepare_path = EuVatValidationUtilities::PreparePath
  u.prepare_query = EuVatValidationUtilities::PrepareQuery
  u.graphql_body = EuVatValidationUtilities::GraphqlBody
  u.graphql_errors = EuVatValidationUtilities::GraphqlErrors
  u.result_basic = EuVatValidationUtilities::ResultBasic
  u.result_body = EuVatValidationUtilities::ResultBody
  u.result_headers = EuVatValidationUtilities::ResultHeaders
  u.transform_request = EuVatValidationUtilities::TransformRequest
  u.transform_response = EuVatValidationUtilities::TransformResponse
}
