-- Typed models for the EuVatValidation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ValidateFormat
---@field checked_at string
---@field country_code string
---@field country_name string
---@field source string
---@field valid boolean
---@field vat_number string
---@field vat_number_full string

---@class ValidateFormatLoadMatch
---@field country string
---@field number string

---@class Vat
---@field checked_at string
---@field company_address? string
---@field company_name? string
---@field country_code string
---@field country_name string
---@field source string
---@field valid boolean
---@field vat_number string
---@field vat_number_full string

---@class VatLoadMatch
---@field country string
---@field number string

local M = {}

return M
