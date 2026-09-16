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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('VatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when EU_VAT_VALIDATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('EU_VAT_VALIDATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EuVatValidationSDK.test();
        const ent = testsdk.Vat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.EU_VAT_VALIDATION_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "checked_at", "req": true, "short": "Timestamp of the validation check", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "company_address", "req": false, "short": "Registered company address from VIES", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "company_name", "req": false, "short": "Registered company name from VIES", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "country_code", "req": true, "short": "Two-letter ISO country code", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "country_name", "req": true, "short": "Full country name", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "source", "req": true, "short": "Source of validation data", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "valid", "req": true, "short": "Whether the VAT number is valid according to VIES", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "name": "vat_number", "req": true, "short": "VAT number without country code prefix", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "vat_number_full", "req": true, "short": "Full VAT number including country code prefix", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "from": { "country": "country_name" }, "name": "id", "parts": ["country", "number"], "sep": "/" }, "name": "vat", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "DE", "kind": "param", "name": "country", "orig": "country", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "190119364", "kind": "param", "name": "number", "orig": "number", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /vat/{country}/{number}", "json": "{\"operationId\":\"validateVatNumber\",\"parameters\":[{\"description\":\"Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"DE\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"VAT number without country code prefix\",\"in\":\"path\",\"name\":\"number\",\"required\":true,\"schema\":{\"example\":\"190119364\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"checked_at\":\"2026-04-26T12:00:00+00:00\",\"company_address\":\"Musterstrasse 1\\n10115 Berlin\",\"company_name\":\"EXAMPLE GMBH\",\"country_code\":\"DE\",\"country_name\":\"Germany\",\"source\":\"VIES\",\"valid\":true,\"vat_number\":\"190119364\",\"vat_number_full\":\"DE190119364\"},\"schema\":{\"properties\":{\"checked_at\":{\"description\":\"Timestamp of the validation check\",\"example\":\"2026-04-26T12:00:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"company_address\":{\"description\":\"Registered company address from VIES\",\"example\":\"Musterstrasse 1\\n10115 Berlin\",\"nullable\":true,\"type\":\"string\"},\"company_name\":{\"description\":\"Registered company name from VIES\",\"example\":\"EXAMPLE GMBH\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO country code\",\"example\":\"DE\",\"type\":\"string\"},\"country_name\":{\"description\":\"Full country name\",\"example\":\"Germany\",\"type\":\"string\"},\"source\":{\"description\":\"Source of validation data\",\"enum\":[\"VIES\"],\"example\":\"VIES\",\"type\":\"string\"},\"valid\":{\"description\":\"Whether the VAT number is valid according to VIES\",\"type\":\"boolean\"},\"vat_number\":{\"description\":\"VAT number without country code prefix\",\"example\":\"190119364\",\"type\":\"string\"},\"vat_number_full\":{\"description\":\"Full VAT number including country code prefix\",\"example\":\"DE190119364\",\"type\":\"string\"}},\"required\":[\"valid\",\"country_code\",\"country_name\",\"vat_number\",\"vat_number_full\",\"checked_at\",\"source\"],\"type\":\"object\"}}},\"description\":\"Successful VAT validation response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid country code or VAT number format\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - missing or invalid API key\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"checked_at\":\"2026-04-26T12:00:00+00:00\",\"company_address\":null,\"company_name\":null,\"country_code\":\"DE\",\"country_name\":\"Germany\",\"source\":\"VIES\",\"valid\":false,\"vat_number\":\"190119364\",\"vat_number_full\":\"DE190119364\"},\"schema\":{\"properties\":{\"checked_at\":{\"description\":\"Timestamp of the validation check\",\"example\":\"2026-04-26T12:00:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"company_address\":{\"description\":\"Registered company address from VIES\",\"example\":\"Musterstrasse 1\\n10115 Berlin\",\"nullable\":true,\"type\":\"string\"},\"company_name\":{\"description\":\"Registered company name from VIES\",\"example\":\"EXAMPLE GMBH\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO country code\",\"example\":\"DE\",\"type\":\"string\"},\"country_name\":{\"description\":\"Full country name\",\"example\":\"Germany\",\"type\":\"string\"},\"source\":{\"description\":\"Source of validation data\",\"enum\":[\"VIES\"],\"example\":\"VIES\",\"type\":\"string\"},\"valid\":{\"description\":\"Whether the VAT number is valid according to VIES\",\"type\":\"boolean\"},\"vat_number\":{\"description\":\"VAT number without country code prefix\",\"example\":\"190119364\",\"type\":\"string\"},\"vat_number_full\":{\"description\":\"Full VAT number including country code prefix\",\"example\":\"DE190119364\",\"type\":\"string\"}},\"required\":[\"valid\",\"country_code\",\"country_name\",\"vat_number\",\"vat_number_full\",\"checked_at\",\"source\"],\"type\":\"object\"}}},\"description\":\"VAT number not found or invalid\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error or VIES service unavailable\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Get your key at https://kiprio.com/vat-api/\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/vat/{country}/{number}", "segments": [{ "lit": "vat" }, { "var": "country" }, { "var": "number" }], "select": { "exist": ["country", "number"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["vat"]] }, "key$": "vat", "name__orig": "vat", "Name": "Vat", "name_": "vat", "name-": "vat", "NAME": "VAT", "index$": 1 }, { "active": true, "entity": "vat", "key$": "BasicVatFlow", "kind": "basic", "name": "BasicVatFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "vat_ref01", "srcdatavar": "vat_ref01_data", "suffix": "_dt0" }, "match": { "country": "country01", "id": "vat01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vat_ref01" } }], "index$": 0 }] }, 'Vat');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vat_ref01_data = Object.values(setup.data.existing.vat)[0];
        // LOAD
        const vat_ref01_ent = client.Vat();
        const vat_ref01_match_dt0 = {};
        vat_ref01_match_dt0.id = vat_ref01_data.id;
        const vat_ref01_data_dt0 = (await vat_ref01_ent.load(vat_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vat_ref01_data_dt0.id === vat_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vat/VatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EuVatValidationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vat01', 'vat02', 'vat03', 'vat01', 'vat02', 'vat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'EU_VAT_VALIDATION_TEST_VAT_ENTID': idmap,
        'EU_VAT_VALIDATION_TEST_LIVE': 'FALSE',
        'EU_VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
        'EU_VAT_VALIDATION_APIKEY': '',
    });
    idmap = env['EU_VAT_VALIDATION_TEST_VAT_ENTID'];
    const live = 'TRUE' === env.EU_VAT_VALIDATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['EU_VAT_VALIDATION_TEST_VAT_ENTID'];
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
//# sourceMappingURL=VatEntity.test.js.map