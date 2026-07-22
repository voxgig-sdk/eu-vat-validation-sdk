# frozen_string_literal: true

# Typed models for the EuVatValidation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ValidateFormat entity data model.
#
# @!attribute [rw] checked_at
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] country_name
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] valid
#   @return [Boolean]
#
# @!attribute [rw] vat_number
#   @return [String]
#
# @!attribute [rw] vat_number_full
#   @return [String]
ValidateFormat = Struct.new(
  :checked_at,
  :country_code,
  :country_name,
  :source,
  :valid,
  :vat_number,
  :vat_number_full,
  keyword_init: true
)

# Request payload for ValidateFormat#load.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
ValidateFormatLoadMatch = Struct.new(
  :country,
  :number,
  keyword_init: true
)

# Vat entity data model.
#
# @!attribute [rw] checked_at
#   @return [String]
#
# @!attribute [rw] company_address
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] country_name
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] valid
#   @return [Boolean]
#
# @!attribute [rw] vat_number
#   @return [String]
#
# @!attribute [rw] vat_number_full
#   @return [String]
Vat = Struct.new(
  :checked_at,
  :company_address,
  :company_name,
  :country_code,
  :country_name,
  :source,
  :valid,
  :vat_number,
  :vat_number_full,
  keyword_init: true
)

# Request payload for Vat#load.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] number
#   @return [String]
VatLoadMatch = Struct.new(
  :country,
  :number,
  keyword_init: true
)

