# EuVatValidation SDK configuration

module EuVatValidationConfig
  def self.make_config
    {
      "main" => {
        "name" => "EuVatValidation",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://kiprio.com/v1",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "validate_format" => {},
          "vat" => {},
        },
      },
      "entity" => {
        "validate_format" => {
          "fields" => [
            {
              "active" => true,
              "name" => "checked_at",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "country_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "country_name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "source",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "valid",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "vat_number",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "vat_number_full",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 6,
            },
          ],
          "name" => "validate_format",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "DE",
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "example" => "190119364",
                        "kind" => "param",
                        "name" => "number",
                        "orig" => "number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/vat/validate-format/{country}/{number}",
                  "parts" => [
                    "vat",
                    "validate-format",
                    "{country}",
                    "{number}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "number",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "validate_format",
              ],
            ],
          },
        },
        "vat" => {
          "fields" => [
            {
              "active" => true,
              "name" => "checked_at",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "company_address",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "company_name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "country_code",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "country_name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "source",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "valid",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "vat_number",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "vat_number_full",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 8,
            },
          ],
          "name" => "vat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "DE",
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "example" => "190119364",
                        "kind" => "param",
                        "name" => "number",
                        "orig" => "number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/vat/{country}/{number}",
                  "parts" => [
                    "vat",
                    "{country}",
                    "{number}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "number",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "vat",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EuVatValidationFeatures.make_feature(name)
  end
end
