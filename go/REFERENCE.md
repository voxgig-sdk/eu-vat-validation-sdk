# EuVatValidation Golang SDK Reference

Complete API reference for the EuVatValidation Golang SDK.


## EuVatValidationSDK

### Constructor

```go
func NewEuVatValidationSDK(options map[string]any) *EuVatValidationSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *EuVatValidationSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *EuVatValidationSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `ValidateFormat(data map[string]any) EuVatValidationEntity`

Create a new `ValidateFormat` entity instance. Pass `nil` for no initial data.

#### `Vat(data map[string]any) EuVatValidationEntity`

Create a new `Vat` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ValidateFormatEntity

```go
validateFormat := client.ValidateFormat(nil)
fmt.Println(validateFormat.GetName()) // "validate_format"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `country_name` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `valid` | `bool` | Yes |  |
| `vat_number` | `string` | Yes |  |
| `vat_number_full` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ValidateFormat(nil).Load(map[string]any{"country": "country", "number": "number"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ValidateFormatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VatEntity

```go
vat := client.Vat(nil)
fmt.Println(vat.GetName()) // "vat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `string` | Yes |  |
| `company_address` | `string` | No |  |
| `company_name` | `string` | No |  |
| `country_code` | `string` | Yes |  |
| `country_name` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `valid` | `bool` | Yes |  |
| `vat_number` | `string` | Yes |  |
| `vat_number_full` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Vat(nil).Load(map[string]any{"country": "country", "number": "number"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewEuVatValidationSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

