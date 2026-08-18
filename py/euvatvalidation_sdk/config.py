# EuVatValidation SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "name": "checked_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vat_number",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "vat_number_full",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "vat",
                  "validate-format",
                  "{country}",
                  "{number}",
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
            "name": "checked_at",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "company_address",
            "type": "`$STRING`",
          },
          {
            "name": "company_name",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vat_number",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "vat_number_full",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "vat",
                  "{country}",
                  "{number}",
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
