<?php
declare(strict_types=1);

// EuVatValidation SDK utility: result_body

class EuVatValidationResultBody
{
    public static function call(EuVatValidationContext $ctx): ?EuVatValidationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
