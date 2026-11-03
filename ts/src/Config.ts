
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'EuVatValidation',
        slug: "eu-vat-validation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://kiprio.com/v1",

    auth: {
      prefix: '',
      name: 'X-API-Key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        validate_format: {
        },
  
        vat: {
        },
  
    }
  }


  entity = {
    "validate_format": {
      "fields": [
        {
          "name": "checked_at",
          "title": "Checked At",
          "type": "`$STRING`",
          "req": true,
          "short": "Timestamp of the validation check",
          "format": "date-time"
        },
        {
          "name": "country_code",
          "title": "Country Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Two-letter ISO country code"
        },
        {
          "name": "country_name",
          "title": "Country Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Full country name"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true,
          "short": "Source of validation"
        },
        {
          "name": "valid",
          "title": "Valid",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the VAT number format is valid according to country-specific rules"
        },
        {
          "name": "vat_number",
          "title": "Vat Number",
          "type": "`$STRING`",
          "req": true,
          "short": "VAT number without country code prefix"
        },
        {
          "name": "vat_number_full",
          "title": "Vat Number Full",
          "type": "`$STRING`",
          "req": true,
          "short": "Full VAT number including country code prefix"
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
              "parts": [
                "vat",
                "validate-format",
                "{country}",
                "{number}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "DE"
                  },
                  {
                    "name": "number",
                    "orig": "number",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "190119364"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "number"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "vat": {
      "fields": [
        {
          "name": "checked_at",
          "title": "Checked At",
          "type": "`$STRING`",
          "req": true,
          "short": "Timestamp of the validation check",
          "format": "date-time"
        },
        {
          "name": "company_address",
          "title": "Company Address",
          "type": "`$STRING`",
          "short": "Registered company address from VIES"
        },
        {
          "name": "company_name",
          "title": "Company Name",
          "type": "`$STRING`",
          "short": "Registered company name from VIES"
        },
        {
          "name": "country_code",
          "title": "Country Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Two-letter ISO country code"
        },
        {
          "name": "country_name",
          "title": "Country Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Full country name"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true,
          "short": "Source of validation data"
        },
        {
          "name": "valid",
          "title": "Valid",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the VAT number is valid according to VIES"
        },
        {
          "name": "vat_number",
          "title": "Vat Number",
          "type": "`$STRING`",
          "req": true,
          "short": "VAT number without country code prefix"
        },
        {
          "name": "vat_number_full",
          "title": "Vat Number Full",
          "type": "`$STRING`",
          "req": true,
          "short": "Full VAT number including country code prefix"
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
              "parts": [
                "vat",
                "{country}",
                "{number}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "DE"
                  },
                  {
                    "name": "number",
                    "orig": "number",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "190119364"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "number"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

