# ValidateFormat entity test

require "minitest/autorun"
require "json"
require_relative "../EuVatValidation_sdk"
require_relative "runner"

class ValidateFormatEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EuVatValidationSDK.test(nil, nil)
    ent = testsdk.ValidateFormat(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = validate_format_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "validate_format." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    validate_format_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.validate_format")))
    validate_format_ref01_data = nil
    if validate_format_ref01_data_raw.length > 0
      validate_format_ref01_data = Helpers.to_map(validate_format_ref01_data_raw[0][1])
    end

    # LOAD
    validate_format_ref01_ent = client.ValidateFormat(nil)
    validate_format_ref01_match_dt0 = {}
    validate_format_ref01_data_dt0_loaded = validate_format_ref01_ent.load(validate_format_ref01_match_dt0, nil)
    assert !validate_format_ref01_data_dt0_loaded.nil?

  end
end

def validate_format_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "validate_format", "ValidateFormatTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EuVatValidationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["validate_format01", "validate_format02", "validate_format03", "country01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID" => idmap,
    "EU_VAT_VALIDATION_TEST_LIVE" => "FALSE",
    "EU_VAT_VALIDATION_TEST_EXPLAIN" => "FALSE",
    "EU_VAT_VALIDATION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EU_VAT_VALIDATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["EU_VAT_VALIDATION_APIKEY"],
      },
      extra || {},
    ])
    client = EuVatValidationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EU_VAT_VALIDATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EU_VAT_VALIDATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
