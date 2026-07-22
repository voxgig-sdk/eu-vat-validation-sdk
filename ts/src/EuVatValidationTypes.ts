// Typed models for the EuVatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ValidateFormat {
  checked_at: string
  country_code: string
  country_name: string
  source: string
  valid: boolean
  vat_number: string
  vat_number_full: string
}

export interface ValidateFormatLoadMatch {
  country: string
  number: string
}

export interface Vat {
  checked_at: string
  company_address?: string
  company_name?: string
  country_code: string
  country_name: string
  source: string
  valid: boolean
  vat_number: string
  vat_number_full: string
}

export interface VatLoadMatch {
  country: string
  number: string
}

