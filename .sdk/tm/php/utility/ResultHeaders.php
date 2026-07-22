<?php
declare(strict_types=1);

// EuVatValidation SDK utility: result_headers

class EuVatValidationResultHeaders
{
    public static function call(EuVatValidationContext $ctx): ?EuVatValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
