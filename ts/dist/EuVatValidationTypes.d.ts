export interface ValidateFormat {
    checked_at: string;
    country_code: string;
    country_name: string;
    id?: string;
    source: string;
    valid: boolean;
    vat_number: string;
    vat_number_full: string;
}
export interface ValidateFormatLoadMatch {
    country: string;
    number: string;
}
export interface Vat {
    checked_at: string;
    company_address?: string;
    company_name?: string;
    country_code: string;
    country_name: string;
    id?: string;
    source: string;
    valid: boolean;
    vat_number: string;
    vat_number_full: string;
}
export interface VatLoadMatch {
    country: string;
    number: string;
}
