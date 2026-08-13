<?php
declare(strict_types=1);

// ValidateFormat entity test

require_once __DIR__ . '/../euvatvalidation_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ValidateFormatEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EuVatValidationSDK::test(null, null);
        $ent = $testsdk->ValidateFormat(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = validate_format_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "validate_format." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $validate_format_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.validate_format")));
        $validate_format_ref01_data = null;
        if (count($validate_format_ref01_data_raw) > 0) {
            $validate_format_ref01_data = Helpers::to_map($validate_format_ref01_data_raw[0][1]);
        }

        // LOAD
        $validate_format_ref01_ent = $client->ValidateFormat(null);
        $validate_format_ref01_match_dt0 = [];
        $validate_format_ref01_data_dt0_loaded = $validate_format_ref01_ent->load($validate_format_ref01_match_dt0, null);
        $this->assertNotNull($validate_format_ref01_data_dt0_loaded);

    }
}

function validate_format_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/validate_format/ValidateFormatTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EuVatValidationSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["validate_format01", "validate_format02", "validate_format03", "country01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID" => $idmap,
        "EU_VAT_VALIDATION_TEST_LIVE" => "FALSE",
        "EU_VAT_VALIDATION_TEST_EXPLAIN" => "FALSE",
        "EU_VAT_VALIDATION_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["EU_VAT_VALIDATION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["EU_VAT_VALIDATION_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new EuVatValidationSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["EU_VAT_VALIDATION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["EU_VAT_VALIDATION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
