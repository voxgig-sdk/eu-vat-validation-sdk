-- EuVatValidation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "EuVatValidation",
      slug = "eu-vat-validation",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://kiprio.com/v1",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["validate_format"] = {},
        ["vat"] = {},
      },
    },
    entity = {
      ["validate_format"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "checked_at",
            ["req"] = true,
            ["short"] = "Timestamp of the validation check",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_code",
            ["req"] = true,
            ["short"] = "Two-letter ISO country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_name",
            ["req"] = true,
            ["short"] = "Full country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["req"] = true,
            ["short"] = "Source of validation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
            ["req"] = true,
            ["short"] = "Whether the VAT number format is valid according to country-specific rules",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "vat_number",
            ["req"] = true,
            ["short"] = "VAT number without country code prefix",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "vat_number_full",
            ["req"] = true,
            ["short"] = "Full VAT number including country code prefix",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["country"] = "country_name",
          },
          ["name"] = "id",
          ["parts"] = {
            "country",
            "number",
          },
          ["sep"] = "/",
        },
        ["name"] = "validate_format",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "DE",
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "190119364",
                      ["kind"] = "param",
                      ["name"] = "number",
                      ["orig"] = "number",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/vat/validate-format/{country}/{number}",
                ["segments"] = {
                  {
                    ["lit"] = "vat",
                  },
                  {
                    ["lit"] = "validate-format",
                  },
                  {
                    ["var"] = "country",
                  },
                  {
                    ["var"] = "number",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "vat",
                  "validate-format",
                  "{country}",
                  "{number}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "validate_format",
            },
          },
        },
      },
      ["vat"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "checked_at",
            ["req"] = true,
            ["short"] = "Timestamp of the validation check",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "company_address",
            ["short"] = "Registered company address from VIES",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "company_name",
            ["short"] = "Registered company name from VIES",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_code",
            ["req"] = true,
            ["short"] = "Two-letter ISO country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_name",
            ["req"] = true,
            ["short"] = "Full country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "source",
            ["req"] = true,
            ["short"] = "Source of validation data",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
            ["req"] = true,
            ["short"] = "Whether the VAT number is valid according to VIES",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "vat_number",
            ["req"] = true,
            ["short"] = "VAT number without country code prefix",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "vat_number_full",
            ["req"] = true,
            ["short"] = "Full VAT number including country code prefix",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["country"] = "country_name",
          },
          ["name"] = "id",
          ["parts"] = {
            "country",
            "number",
          },
          ["sep"] = "/",
        },
        ["name"] = "vat",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "DE",
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "190119364",
                      ["kind"] = "param",
                      ["name"] = "number",
                      ["orig"] = "number",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/vat/{country}/{number}",
                ["segments"] = {
                  {
                    ["lit"] = "vat",
                  },
                  {
                    ["var"] = "country",
                  },
                  {
                    ["var"] = "number",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "vat",
                  "{country}",
                  "{number}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "vat",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
