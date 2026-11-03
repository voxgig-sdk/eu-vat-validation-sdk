package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/eu-vat-validation-sdk/go"
	"github.com/voxgig-sdk/eu-vat-validation-sdk/go/core"

	vs "github.com/voxgig-sdk/eu-vat-validation-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const validate_formatEntityLiveStrict = true


func TestValidateFormatEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ValidateFormat(nil)
		if ent == nil {
			t.Fatal("expected non-nil ValidateFormatEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ValidateFormat(nil).Load(map[string]any{"country": 1, "number": "x"}, nil)
		if sdkerr, ok := err.(*core.EuVatValidationError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := validate_formatBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "validate_format." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			t.Skip("Live coverage incomplete: the flow has no step to run")
			return
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		validateFormatRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.validate_format")))
		var validateFormatRef01Data map[string]any
		if len(validateFormatRef01DataRaw) > 0 {
			validateFormatRef01Data = core.ToMapAny(validateFormatRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = validateFormatRef01Data

	})
}

func validate_formatBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "validate_format", "ValidateFormatTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read validate_format test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse validate_format test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"validate_format01", "validate_format02", "validate_format03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID": idmap,
		"EU_VAT_VALIDATION_TEST_LIVE":      "FALSE",
		"EU_VAT_VALIDATION_TEST_EXPLAIN":   "FALSE",
		"EU_VAT_VALIDATION_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EU_VAT_VALIDATION_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["EU_VAT_VALIDATION_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewEuVatValidationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EU_VAT_VALIDATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EU_VAT_VALIDATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
