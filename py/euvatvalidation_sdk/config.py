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
                "name": "X-API-Key",
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
            "name": "checked_at",
            "title": "Checked At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp of the validation check",
            "format": "date-time",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Two-letter ISO country code",
          },
          {
            "name": "country_name",
            "title": "Country Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Full country name",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
            "short": "Source of validation",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the VAT number format is valid according to country-specific rules",
          },
          {
            "name": "vat_number",
            "title": "Vat Number",
            "type": "`$STRING`",
            "req": True,
            "short": "VAT number without country code prefix",
          },
          {
            "name": "vat_number_full",
            "title": "Vat Number Full",
            "type": "`$STRING`",
            "req": True,
            "short": "Full VAT number including country code prefix",
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
                "parts": [
                  "vat",
                  "validate-format",
                  "{country}",
                  "{number}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "DE",
                    },
                    {
                      "name": "number",
                      "orig": "number",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "190119364",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country",
                    "number",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "vat": {
        "fields": [
          {
            "name": "checked_at",
            "title": "Checked At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp of the validation check",
            "format": "date-time",
          },
          {
            "name": "company_address",
            "title": "Company Address",
            "type": "`$STRING`",
            "short": "Registered company address from VIES",
          },
          {
            "name": "company_name",
            "title": "Company Name",
            "type": "`$STRING`",
            "short": "Registered company name from VIES",
          },
          {
            "name": "country_code",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Two-letter ISO country code",
          },
          {
            "name": "country_name",
            "title": "Country Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Full country name",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
            "short": "Source of validation data",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the VAT number is valid according to VIES",
          },
          {
            "name": "vat_number",
            "title": "Vat Number",
            "type": "`$STRING`",
            "req": True,
            "short": "VAT number without country code prefix",
          },
          {
            "name": "vat_number_full",
            "title": "Vat Number Full",
            "type": "`$STRING`",
            "req": True,
            "short": "Full VAT number including country code prefix",
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
                "parts": [
                  "vat",
                  "{country}",
                  "{number}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "country",
                      "orig": "country",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "DE",
                    },
                    {
                      "name": "number",
                      "orig": "number",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "190119364",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "country",
                    "number",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
