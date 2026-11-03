"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ValidateFormatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EU_VAT_VALIDATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EU_VAT_VALIDATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EuVatValidationSDK.test();
        const ent = testsdk.ValidateFormat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EuVatValidationSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ValidateFormat().load({ "country": 1, "number": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EU_VAT_VALIDATION_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'validate_format.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "checked_at": { "a": true, "fo": "date-time", "h": "Checked At", "n": "checked_at", "r": true, "sh": "Timestamp of the validation check", "t": "`$STRING`", "key$": "checked_at", "index$": 0 }, "country_code": { "a": true, "h": "Country Code", "n": "country_code", "r": true, "sh": "Two-letter ISO country code", "t": "`$STRING`", "key$": "country_code", "index$": 1 }, "country_name": { "a": true, "h": "Country Name", "n": "country_name", "r": true, "sh": "Full country name", "t": "`$STRING`", "key$": "country_name", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "Source of validation", "t": "`$STRING`", "key$": "source", "index$": 4 }, "valid": { "a": true, "h": "Valid", "n": "valid", "r": true, "sh": "Whether the VAT number format is valid according to country-specific rules", "t": "`$BOOLEAN`", "key$": "valid", "index$": 5 }, "vat_number": { "a": true, "h": "Vat Number", "n": "vat_number", "r": true, "sh": "VAT number without country code prefix", "t": "`$STRING`", "key$": "vat_number", "index$": 6 }, "vat_number_full": { "a": true, "h": "Vat Number Full", "n": "vat_number_full", "r": true, "sh": "Full VAT number including country code prefix", "t": "`$STRING`", "key$": "vat_number_full", "index$": 7 } }, "id": { "field": "id", "from": { "country": "country_name" }, "name": "id", "parts": ["country", "number"], "sep": "/" }, "name": "validate_format", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /vat/validate-format/{country}/{number}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "DE", "k": "param", "n": "country", "or": "country", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "190119364", "k": "param", "n": "number", "or": "number", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/vat/validate-format/{country}/{number}", "q": { "exist": ["country", "number"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "vat" }, { "lit": "validate-format" }, { "var": "country" }, { "var": "number" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "validate_format", "name__orig": "validate_format", "Name": "ValidateFormat", "name_": "validate_format", "name-": "validate-format", "NAME": "VALIDATE_FORMAT", "index$": 0 }, { "active": true, "entity": "validate_format", "key$": "BasicValidateFormatFlow", "kind": "basic", "name": "BasicValidateFormatFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "validate_format_ref01", "srcdatavar": "validate_format_ref01_data", "suffix": "_dt0" }, "m": { "country": "country01", "id": "validate_format01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-validate_format_ref01" } }], "unreachable": true }] }, 'ValidateFormat', { "GET /vat/validate-format/{country}/{number}": { "protocol": "http", "parameters": [{ "name": "country", "in": "path", "required": true, "description": "Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)", "schema": { "type": "string", "pattern": "^[A-Z]{2}$", "example": "DE" }, "index$": 0 }, { "name": "number", "in": "path", "required": true, "description": "VAT number without country code prefix", "schema": { "type": "string", "example": "190119364" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let validate_format_ref01_data = Object.values(setup.data.existing.validate_format)[0];
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/validate_format/ValidateFormatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EuVatValidationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['validate_format01', 'validate_format02', 'validate_format03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID': idmap,
        'EU_VAT_VALIDATION_TEST_LIVE': 'FALSE',
        'EU_VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
        'EU_VAT_VALIDATION_APIKEY': '',
    });
    idmap = env['EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID'];
    const live = 'TRUE' === env.EU_VAT_VALIDATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EuVatValidationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.EU_VAT_VALIDATION_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.EU_VAT_VALIDATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ValidateFormatEntity.test.js.map