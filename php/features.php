<?php
declare(strict_types=1);

// EuVatValidation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EuVatValidationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EuVatValidationBaseFeature();
            case "test":
                return new EuVatValidationTestFeature();
            default:
                return new EuVatValidationBaseFeature();
        }
    }
}
