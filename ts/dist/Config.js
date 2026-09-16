"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'EuVatValidation',
        slug: "eu-vat-validation",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://kiprio.com/v1",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            validate_format: {},
            vat: {},
        }
    };
    entity = {
        "validate_format": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "checked_at",
                    "req": true,
                    "short": "Timestamp of the validation check",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "req": true,
                    "short": "Two-letter ISO country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_name",
                    "req": true,
                    "short": "Full country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "source",
                    "req": true,
                    "short": "Source of validation",
                    "type": "`$STRING`"
                },
                {
                    "name": "valid",
                    "req": true,
                    "short": "Whether the VAT number format is valid according to country-specific rules",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "vat_number",
                    "req": true,
                    "short": "VAT number without country code prefix",
                    "type": "`$STRING`"
                },
                {
                    "name": "vat_number_full",
                    "req": true,
                    "short": "Full VAT number including country code prefix",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "country": "country_name"
                },
                "name": "id",
                "parts": [
                    "country",
                    "number"
                ],
                "sep": "/"
            },
            "name": "validate_format",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "DE",
                                        "kind": "param",
                                        "name": "country",
                                        "orig": "country",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "190119364",
                                        "kind": "param",
                                        "name": "number",
                                        "orig": "number",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/vat/validate-format/{country}/{number}",
                            "segments": [
                                {
                                    "lit": "vat"
                                },
                                {
                                    "lit": "validate-format"
                                },
                                {
                                    "var": "country"
                                },
                                {
                                    "var": "number"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "vat",
                                "validate-format",
                                "{country}",
                                "{number}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "validate_format"
                    ]
                ]
            }
        },
        "vat": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "checked_at",
                    "req": true,
                    "short": "Timestamp of the validation check",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_address",
                    "short": "Registered company address from VIES",
                    "type": "`$STRING`"
                },
                {
                    "name": "company_name",
                    "short": "Registered company name from VIES",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "req": true,
                    "short": "Two-letter ISO country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_name",
                    "req": true,
                    "short": "Full country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "source",
                    "req": true,
                    "short": "Source of validation data",
                    "type": "`$STRING`"
                },
                {
                    "name": "valid",
                    "req": true,
                    "short": "Whether the VAT number is valid according to VIES",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "vat_number",
                    "req": true,
                    "short": "VAT number without country code prefix",
                    "type": "`$STRING`"
                },
                {
                    "name": "vat_number_full",
                    "req": true,
                    "short": "Full VAT number including country code prefix",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "country": "country_name"
                },
                "name": "id",
                "parts": [
                    "country",
                    "number"
                ],
                "sep": "/"
            },
            "name": "vat",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "DE",
                                        "kind": "param",
                                        "name": "country",
                                        "orig": "country",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "190119364",
                                        "kind": "param",
                                        "name": "number",
                                        "orig": "number",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/vat/{country}/{number}",
                            "segments": [
                                {
                                    "lit": "vat"
                                },
                                {
                                    "var": "country"
                                },
                                {
                                    "var": "number"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "vat",
                                "{country}",
                                "{number}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "vat"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map