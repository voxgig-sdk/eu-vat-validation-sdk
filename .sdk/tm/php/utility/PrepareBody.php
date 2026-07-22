<?php
declare(strict_types=1);

// EuVatValidation SDK utility: prepare_body

class EuVatValidationPrepareBody
{
    public static function call(EuVatValidationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
