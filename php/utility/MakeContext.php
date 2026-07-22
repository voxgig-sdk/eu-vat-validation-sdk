<?php
declare(strict_types=1);

// EuVatValidation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EuVatValidationMakeContext
{
    public static function call(array $ctxmap, ?EuVatValidationContext $basectx): EuVatValidationContext
    {
        return new EuVatValidationContext($ctxmap, $basectx);
    }
}
