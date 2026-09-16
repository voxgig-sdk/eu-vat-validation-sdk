package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "EuVatValidation",
			"slug": "eu-vat-validation",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://kiprio.com/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"validate_format": map[string]any{},
				"vat": map[string]any{},
			},
		},
		"entity": map[string]any{
			"validate_format": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "checked_at",
						"req": true,
						"short": "Timestamp of the validation check",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"short": "Two-letter ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"short": "Full country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"short": "Source of validation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"req": true,
						"short": "Whether the VAT number format is valid according to country-specific rules",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vat_number",
						"req": true,
						"short": "VAT number without country code prefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vat_number_full",
						"req": true,
						"short": "Full VAT number including country code prefix",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"country": "country_name",
					},
					"name": "id",
					"parts": []any{
						"country",
						"number",
					},
					"sep": "/",
				},
				"name": "validate_format",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "DE",
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "190119364",
											"kind": "param",
											"name": "number",
											"orig": "number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vat/validate-format/{country}/{number}",
								"segments": []any{
									map[string]any{
										"lit": "vat",
									},
									map[string]any{
										"lit": "validate-format",
									},
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "number",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"vat",
									"validate-format",
									"{country}",
									"{number}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"validate_format",
						},
					},
				},
			},
			"vat": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "checked_at",
						"req": true,
						"short": "Timestamp of the validation check",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_address",
						"short": "Registered company address from VIES",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company_name",
						"short": "Registered company name from VIES",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"short": "Two-letter ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"req": true,
						"short": "Full country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"short": "Source of validation data",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"req": true,
						"short": "Whether the VAT number is valid according to VIES",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vat_number",
						"req": true,
						"short": "VAT number without country code prefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vat_number_full",
						"req": true,
						"short": "Full VAT number including country code prefix",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"country": "country_name",
					},
					"name": "id",
					"parts": []any{
						"country",
						"number",
					},
					"sep": "/",
				},
				"name": "vat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "DE",
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "190119364",
											"kind": "param",
											"name": "number",
											"orig": "number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vat/{country}/{number}",
								"segments": []any{
									map[string]any{
										"lit": "vat",
									},
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "number",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"vat",
									"{country}",
									"{number}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"vat",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
