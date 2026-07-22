<?php
declare(strict_types=1);

// Typed models for the EuVatValidation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ValidateFormat entity data model. */
class ValidateFormat
{
    public string $checked_at;
    public string $country_code;
    public string $country_name;
    public string $source;
    public bool $valid;
    public string $vat_number;
    public string $vat_number_full;
}

/** Request payload for ValidateFormat#load. */
class ValidateFormatLoadMatch
{
    public string $country;
    public string $number;
}

/** Vat entity data model. */
class Vat
{
    public string $checked_at;
    public ?string $company_address = null;
    public ?string $company_name = null;
    public string $country_code;
    public string $country_name;
    public string $source;
    public bool $valid;
    public string $vat_number;
    public string $vat_number_full;
}

/** Request payload for Vat#load. */
class VatLoadMatch
{
    public string $country;
    public string $number;
}

