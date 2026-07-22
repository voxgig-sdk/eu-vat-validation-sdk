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

func TestValidateFormatEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ValidateFormat(nil)
		if ent == nil {
			t.Fatal("expected non-nil ValidateFormatEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := validate_formatBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "validate_format." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set EUVATVALIDATION_TEST_VALIDATE_FORMAT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		validateFormatRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.validate_format", setup.data)))
		var validateFormatRef01Data map[string]any
		if len(validateFormatRef01DataRaw) > 0 {
			validateFormatRef01Data = core.ToMapAny(validateFormatRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = validateFormatRef01Data

		// LOAD
		validateFormatRef01Ent := client.ValidateFormat(nil)
		validateFormatRef01MatchDt0 := map[string]any{}
		validateFormatRef01DataDt0Loaded, err := validateFormatRef01Ent.Load(validateFormatRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if validateFormatRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

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
	idmap := vs.Transform(
		[]any{"validate_format01", "validate_format02", "validate_format03", "country01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("EUVATVALIDATION_TEST_VALIDATE_FORMAT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EUVATVALIDATION_TEST_VALIDATE_FORMAT_ENTID": idmap,
		"EUVATVALIDATION_TEST_LIVE":      "FALSE",
		"EUVATVALIDATION_TEST_EXPLAIN":   "FALSE",
		"EUVATVALIDATION_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["EUVATVALIDATION_TEST_VALIDATE_FORMAT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EUVATVALIDATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["EUVATVALIDATION_APIKEY"],
			},
			extra,
		})
		client = sdk.NewEuVatValidationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EUVATVALIDATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EUVATVALIDATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
