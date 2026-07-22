# EuVatValidation Ruby SDK Reference

Complete API reference for the EuVatValidation Ruby SDK.


## EuVatValidationSDK

### Constructor

```ruby
require_relative 'EuVatValidation_sdk'

client = EuVatValidationSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EuVatValidationSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = EuVatValidationSDK.test
```


### Instance Methods

#### `ValidateFormat(data = nil)`

Create a new `ValidateFormat` entity instance. Pass `nil` for no initial data.

#### `Vat(data = nil)`

Create a new `Vat` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ValidateFormatEntity

```ruby
validate_format = client.ValidateFormat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `String` | Yes |  |
| `country_code` | `String` | Yes |  |
| `country_name` | `String` | Yes |  |
| `source` | `String` | Yes |  |
| `valid` | `Boolean` | Yes |  |
| `vat_number` | `String` | Yes |  |
| `vat_number_full` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ValidateFormat.load({ "country" => "country", "number" => "number" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ValidateFormatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VatEntity

```ruby
vat = client.Vat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `String` | Yes |  |
| `company_address` | `String` | No |  |
| `company_name` | `String` | No |  |
| `country_code` | `String` | Yes |  |
| `country_name` | `String` | Yes |  |
| `source` | `String` | Yes |  |
| `valid` | `Boolean` | Yes |  |
| `vat_number` | `String` | Yes |  |
| `vat_number_full` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Vat.load({ "country" => "country", "number" => "number" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = EuVatValidationSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

