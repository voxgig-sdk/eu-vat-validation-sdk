// Typed models for the EuVatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// ValidateFormat is the typed data model for the validate_format entity.
type ValidateFormat struct {
	CheckedAt string `json:"checked_at"`
	CountryCode string `json:"country_code"`
	CountryName string `json:"country_name"`
	Source string `json:"source"`
	Valid bool `json:"valid"`
	VatNumber string `json:"vat_number"`
	VatNumberFull string `json:"vat_number_full"`
}

// ValidateFormatLoadMatch is the typed request payload for ValidateFormat.LoadTyped.
type ValidateFormatLoadMatch struct {
	Country string `json:"country"`
	Number string `json:"number"`
}

// Vat is the typed data model for the vat entity.
type Vat struct {
	CheckedAt string `json:"checked_at"`
	CompanyAddress *string `json:"company_address,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	CountryCode string `json:"country_code"`
	CountryName string `json:"country_name"`
	Source string `json:"source"`
	Valid bool `json:"valid"`
	VatNumber string `json:"vat_number"`
	VatNumberFull string `json:"vat_number_full"`
}

// VatLoadMatch is the typed request payload for Vat.LoadTyped.
type VatLoadMatch struct {
	Country string `json:"country"`
	Number string `json:"number"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
