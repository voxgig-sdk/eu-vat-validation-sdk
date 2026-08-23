# EuVatValidation SDK configuration

module EuVatValidationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "EuVatValidation",
        "slug" => "eu-vat-validation",
        "version" => "0.0.1",
        "target" => "rb",
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
              "name" => "checked_at",
              "req" => true,
              "short" => "Timestamp of the validation check",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "req" => true,
              "short" => "Two-letter ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_name",
              "req" => true,
              "short" => "Full country name",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "req" => true,
              "short" => "Source of validation",
              "type" => "`$STRING`",
            },
            {
              "name" => "valid",
              "req" => true,
              "short" => "Whether the VAT number format is valid according to country-specific rules",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "vat_number",
              "req" => true,
              "short" => "VAT number without country code prefix",
              "type" => "`$STRING`",
            },
            {
              "name" => "vat_number_full",
              "req" => true,
              "short" => "Full VAT number including country code prefix",
              "type" => "`$STRING`",
            },
          ],
          "name" => "validate_format",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "DE",
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "190119364",
                        "kind" => "param",
                        "name" => "number",
                        "orig" => "number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "name" => "checked_at",
              "req" => true,
              "short" => "Timestamp of the validation check",
              "type" => "`$STRING`",
            },
            {
              "name" => "company_address",
              "short" => "Registered company address from VIES",
              "type" => "`$STRING`",
            },
            {
              "name" => "company_name",
              "short" => "Registered company name from VIES",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "req" => true,
              "short" => "Two-letter ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_name",
              "req" => true,
              "short" => "Full country name",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "req" => true,
              "short" => "Source of validation data",
              "type" => "`$STRING`",
            },
            {
              "name" => "valid",
              "req" => true,
              "short" => "Whether the VAT number is valid according to VIES",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "vat_number",
              "req" => true,
              "short" => "VAT number without country code prefix",
              "type" => "`$STRING`",
            },
            {
              "name" => "vat_number_full",
              "req" => true,
              "short" => "Full VAT number including country code prefix",
              "type" => "`$STRING`",
            },
          ],
          "name" => "vat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "DE",
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "190119364",
                        "kind" => "param",
                        "name" => "number",
                        "orig" => "number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
