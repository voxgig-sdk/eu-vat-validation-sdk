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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "checked_at": { "a": true, "fo": "date-time", "h": "Checked At", "n": "checked_at", "r": true, "sh": "Timestamp of the validation check", "t": "`$STRING`", "key$": "checked_at", "index$": 0 }, "company_address": { "a": true, "h": "Company Address", "n": "company_address", "r": false, "sh": "Registered company address from VIES", "t": "`$STRING`", "key$": "company_address", "index$": 1 }, "company_name": { "a": true, "h": "Company Name", "n": "company_name", "r": false, "sh": "Registered company name from VIES", "t": "`$STRING`", "key$": "company_name", "index$": 2 }, "country_code": { "a": true, "h": "Country Code", "n": "country_code", "r": true, "sh": "Two-letter ISO country code", "t": "`$STRING`", "key$": "country_code", "index$": 3 }, "country_name": { "a": true, "h": "Country Name", "n": "country_name", "r": true, "sh": "Full country name", "t": "`$STRING`", "key$": "country_name", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "Source of validation data", "t": "`$STRING`", "key$": "source", "index$": 6 }, "valid": { "a": true, "h": "Valid", "n": "valid", "r": true, "sh": "Whether the VAT number is valid according to VIES", "t": "`$BOOLEAN`", "key$": "valid", "index$": 7 }, "vat_number": { "a": true, "h": "Vat Number", "n": "vat_number", "r": true, "sh": "VAT number without country code prefix", "t": "`$STRING`", "key$": "vat_number", "index$": 8 }, "vat_number_full": { "a": true, "h": "Vat Number Full", "n": "vat_number_full", "r": true, "sh": "Full VAT number including country code prefix", "t": "`$STRING`", "key$": "vat_number_full", "index$": 9 } }, "id": { "field": "id", "from": { "country": "country_name" }, "name": "id", "parts": ["country", "number"], "sep": "/" }, "name": "vat", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /vat/{country}/{number}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "DE", "k": "param", "n": "country", "or": "country", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "190119364", "k": "param", "n": "number", "or": "number", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/vat/{country}/{number}", "q": { "exist": ["country", "number"] }, "r": {}, "s": [{ "lit": "vat" }, { "var": "country" }, { "var": "number" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "vat", "name__orig": "vat", "Name": "Vat", "name_": "vat", "name-": "vat", "NAME": "VAT", "index$": 1 }, { "active": true, "entity": "vat", "key$": "BasicVatFlow", "kind": "basic", "name": "BasicVatFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "vat_ref01", "srcdatavar": "vat_ref01_data", "suffix": "_dt0" }, "m": { "country": "country01", "id": "vat01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vat_ref01" } }], "index$": 0 }] }, 'Vat', { "GET /vat/{country}/{number}": { "protocol": "http", "operationId": "validateVatNumber", "responses": { "200": { "description": "Successful VAT validation response", "content": { "application/json": { "schema": { "type": "object", "properties": { "valid": { "type": "boolean", "description": "Whether the VAT number is valid according to VIES", "key$": "valid" }, "country_code": { "type": "string", "description": "Two-letter ISO country code", "example": "DE", "key$": "country_code" }, "country_name": { "type": "string", "description": "Full country name", "example": "Germany", "key$": "country_name" }, "vat_number": { "type": "string", "description": "VAT number without country code prefix", "example": "190119364", "key$": "vat_number" }, "vat_number_full": { "type": "string", "description": "Full VAT number including country code prefix", "example": "DE190119364", "key$": "vat_number_full" }, "company_name": { "type": "string", "nullable": true, "description": "Registered company name from VIES", "example": "EXAMPLE GMBH", "key$": "company_name" }, "company_address": { "type": "string", "nullable": true, "description": "Registered company address from VIES", "example": "Musterstrasse 1\n10115 Berlin", "key$": "company_address" }, "checked_at": { "type": "string", "format": "date-time", "description": "Timestamp of the validation check", "example": "2026-04-26T12:00:00+00:00", "key$": "checked_at" }, "source": { "type": "string", "description": "Source of validation data", "enum": ["VIES"], "example": "VIES", "key$": "source" } }, "required": ["valid", "country_code", "country_name", "vat_number", "vat_number_full", "checked_at", "source"], "x-ref": "#/components/schemas/VatValidationResponse", "index$": 0 }, "example": { "valid": true, "country_code": "DE", "country_name": "Germany", "vat_number": "190119364", "vat_number_full": "DE190119364", "company_name": "EXAMPLE GMBH", "company_address": "Musterstrasse 1\n10115 Berlin", "checked_at": "2026-04-26T12:00:00+00:00", "source": "VIES" } } } }, "400": { "description": "Bad request - invalid country code or VAT number format", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "message": { "type": "string", "description": "Detailed error information" } }, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "401": { "description": "Unauthorized - missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "message": { "type": "string", "description": "Detailed error information" } }, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "404": { "description": "VAT number not found or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "valid": { "type": "boolean", "description": "Whether the VAT number is valid according to VIES", "key$": "valid" }, "country_code": { "type": "string", "description": "Two-letter ISO country code", "example": "DE", "key$": "country_code" }, "country_name": { "type": "string", "description": "Full country name", "example": "Germany", "key$": "country_name" }, "vat_number": { "type": "string", "description": "VAT number without country code prefix", "example": "190119364", "key$": "vat_number" }, "vat_number_full": { "type": "string", "description": "Full VAT number including country code prefix", "example": "DE190119364", "key$": "vat_number_full" }, "company_name": { "type": "string", "nullable": true, "description": "Registered company name from VIES", "example": "EXAMPLE GMBH", "key$": "company_name" }, "company_address": { "type": "string", "nullable": true, "description": "Registered company address from VIES", "example": "Musterstrasse 1\n10115 Berlin", "key$": "company_address" }, "checked_at": { "type": "string", "format": "date-time", "description": "Timestamp of the validation check", "example": "2026-04-26T12:00:00+00:00", "key$": "checked_at" }, "source": { "type": "string", "description": "Source of validation data", "enum": ["VIES"], "example": "VIES", "key$": "source" } }, "required": ["valid", "country_code", "country_name", "vat_number", "vat_number_full", "checked_at", "source"], "x-ref": "#/components/schemas/VatValidationResponse" }, "example": { "valid": false, "country_code": "DE", "country_name": "Germany", "vat_number": "190119364", "vat_number_full": "DE190119364", "company_name": null, "company_address": null, "checked_at": "2026-04-26T12:00:00+00:00", "source": "VIES" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "message": { "type": "string", "description": "Detailed error information" } }, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "500": { "description": "Internal server error or VIES service unavailable", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "message": { "type": "string", "description": "Detailed error information" } }, "required": ["error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "country", "in": "path", "required": true, "description": "Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)", "schema": { "type": "string", "pattern": "^[A-Z]{2}$", "example": "DE" }, "index$": 0 }, { "name": "number", "in": "path", "required": true, "description": "VAT number without country code prefix", "schema": { "type": "string", "example": "190119364" }, "index$": 1 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication. Get your key at https://kiprio.com/vat-api/" } } } });
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
    let idmap = transform(['vat01', 'vat02', 'vat03', 'country01'], {
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