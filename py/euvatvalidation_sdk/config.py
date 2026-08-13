# EuVatValidation SDK configuration


def make_config():
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
            "active": True,
            "name": "checked_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "source",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "vat_number",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "vat_number_full",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
        ],
        "name": "validate_format",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "DE",
                      "kind": "param",
                      "name": "country",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "example": "190119364",
                      "kind": "param",
                      "name": "number",
                      "orig": "number",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
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
                "index$": 0,
              },
            ],
            "key$": "load",
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
            "active": True,
            "name": "checked_at",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "company_address",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "company_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "country_name",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "source",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "valid",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "vat_number",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "vat_number_full",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
        ],
        "name": "vat",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "DE",
                      "kind": "param",
                      "name": "country",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "example": "190119364",
                      "kind": "param",
                      "name": "number",
                      "orig": "number",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 1,
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
                "index$": 0,
              },
            ],
            "key$": "load",
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
