# EuVatValidation SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "EuVatValidation",
            "slug": "eu-vat-validation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://kiprio.com/v1",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "validate_format": {},
                "vat": {},
            },
        },
        "entity": {
      "validate_format": {
        "fields": [
          {
            "format": "date-time",
            "name": "checked_at",
            "req": True,
            "short": "Timestamp of the validation check",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "short": "Two-letter ISO country code",
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "short": "Full country name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "req": True,
            "short": "Source of validation",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "req": True,
            "short": "Whether the VAT number format is valid according to country-specific rules",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vat_number",
            "req": True,
            "short": "VAT number without country code prefix",
            "type": "`$STRING`",
          },
          {
            "name": "vat_number_full",
            "req": True,
            "short": "Full VAT number including country code prefix",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "country": "country_name",
          },
          "name": "id",
          "parts": [
            "country",
            "number",
          ],
          "sep": "/",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "190119364",
                      "kind": "param",
                      "name": "number",
                      "orig": "number",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/vat/validate-format/{country}/{number}",
                "segments": [
                  {
                    "lit": "vat",
                  },
                  {
                    "lit": "validate-format",
                  },
                  {
                    "var": "country",
                  },
                  {
                    "var": "number",
                  },
                ],
                "select": {
                  "exist": [
                    "country",
                    "number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "vat",
                  "validate-format",
                  "{country}",
                  "{number}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "validate_format",
            ],
          ],
        },
      },
      "vat": {
        "fields": [
          {
            "format": "date-time",
            "name": "checked_at",
            "req": True,
            "short": "Timestamp of the validation check",
            "type": "`$STRING`",
          },
          {
            "name": "company_address",
            "short": "Registered company address from VIES",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "short": "Registered company name from VIES",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "short": "Two-letter ISO country code",
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "short": "Full country name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "req": True,
            "short": "Source of validation data",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "req": True,
            "short": "Whether the VAT number is valid according to VIES",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vat_number",
            "req": True,
            "short": "VAT number without country code prefix",
            "type": "`$STRING`",
          },
          {
            "name": "vat_number_full",
            "req": True,
            "short": "Full VAT number including country code prefix",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "country": "country_name",
          },
          "name": "id",
          "parts": [
            "country",
            "number",
          ],
          "sep": "/",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "190119364",
                      "kind": "param",
                      "name": "number",
                      "orig": "number",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/vat/{country}/{number}",
                "segments": [
                  {
                    "lit": "vat",
                  },
                  {
                    "var": "country",
                  },
                  {
                    "var": "number",
                  },
                ],
                "select": {
                  "exist": [
                    "country",
                    "number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "vat",
                  "{country}",
                  "{number}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "vat",
            ],
          ],
        },
      },
    },
    }
