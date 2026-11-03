# Vat entity test

require "minitest/autorun"
require "json"
require_relative "../EuVatValidation_sdk"
require_relative "runner"

class VatEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = EuVatValidationSDK.test(nil, nil)
    ent = testsdk.Vat(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = EuVatValidationConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = EuVatValidationSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Vat(nil).load({ "country" => 1, "number" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = vat_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "vat." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      skip("Live coverage incomplete: the flow has no step to run")
    end

    client = setup[:client]

    # Bootstrap entity data from existing test data.
    vat_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.vat")))
    vat_ref01_data = nil
    if vat_ref01_data_raw.length > 0
      vat_ref01_data = Helpers.to_map(vat_ref01_data_raw[0][1])
    end

  end
end

def vat_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "vat", "VatTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EuVatValidationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["vat01", "vat02", "vat03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["EU_VAT_VALIDATION_TEST_VAT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EU_VAT_VALIDATION_TEST_VAT_ENTID" => idmap,
    "EU_VAT_VALIDATION_TEST_LIVE" => "FALSE",
    "EU_VAT_VALIDATION_TEST_EXPLAIN" => "FALSE",
    "EU_VAT_VALIDATION_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["EU_VAT_VALIDATION_TEST_VAT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EU_VAT_VALIDATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
