<?php
declare(strict_types=1);

// EuVatValidation SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

EuVatValidationUtility::setRegistrar(function (EuVatValidationUtility $u): void {
    $u->clean = [EuVatValidationClean::class, 'call'];
    $u->done = [EuVatValidationDone::class, 'call'];
    $u->make_error = [EuVatValidationMakeError::class, 'call'];
    $u->feature_add = [EuVatValidationFeatureAdd::class, 'call'];
    $u->feature_hook = [EuVatValidationFeatureHook::class, 'call'];
    $u->feature_init = [EuVatValidationFeatureInit::class, 'call'];
    $u->fetcher = [EuVatValidationFetcher::class, 'call'];
    $u->make_fetch_def = [EuVatValidationMakeFetchDef::class, 'call'];
    $u->make_context = [EuVatValidationMakeContext::class, 'call'];
    $u->make_options = [EuVatValidationMakeOptions::class, 'call'];
    $u->make_request = [EuVatValidationMakeRequest::class, 'call'];
    $u->make_response = [EuVatValidationMakeResponse::class, 'call'];
    $u->make_result = [EuVatValidationMakeResult::class, 'call'];
    $u->make_point = [EuVatValidationMakePoint::class, 'call'];
    $u->make_spec = [EuVatValidationMakeSpec::class, 'call'];
    $u->make_url = [EuVatValidationMakeUrl::class, 'call'];
    $u->param = [EuVatValidationParam::class, 'call'];
    $u->prepare_auth = [EuVatValidationPrepareAuth::class, 'call'];
    $u->prepare_body = [EuVatValidationPrepareBody::class, 'call'];
    $u->prepare_headers = [EuVatValidationPrepareHeaders::class, 'call'];
    $u->prepare_method = [EuVatValidationPrepareMethod::class, 'call'];
    $u->prepare_params = [EuVatValidationPrepareParams::class, 'call'];
    $u->prepare_path = [EuVatValidationPreparePath::class, 'call'];
    $u->prepare_query = [EuVatValidationPrepareQuery::class, 'call'];
    $u->result_basic = [EuVatValidationResultBasic::class, 'call'];
    $u->result_body = [EuVatValidationResultBody::class, 'call'];
    $u->result_headers = [EuVatValidationResultHeaders::class, 'call'];
    $u->transform_request = [EuVatValidationTransformRequest::class, 'call'];
    $u->transform_response = [EuVatValidationTransformResponse::class, 'call'];
});
