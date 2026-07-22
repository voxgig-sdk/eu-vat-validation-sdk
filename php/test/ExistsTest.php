<?php
declare(strict_types=1);

// EuVatValidation SDK exists test

require_once __DIR__ . '/../euvatvalidation_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EuVatValidationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
