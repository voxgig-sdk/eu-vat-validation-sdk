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
| `checked_at` | `String` | Yes | Timestamp of the validation check |
| `country_code` | `String` | Yes | Two-letter ISO country code |
| `country_name` | `String` | Yes | Full country name |
| `id` | `String` | No |  |
| `source` | `String` | Yes | Source of validation |
| `valid` | `Boolean` | Yes | Whether the VAT number format is valid according to country-specific rules |
| `vat_number` | `String` | Yes | VAT number without country code prefix |
| `vat_number_full` | `String` | Yes | Full VAT number including country code prefix |

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
| `checked_at` | `String` | Yes | Timestamp of the validation check |
| `company_address` | `String` | No | Registered company address from VIES |
| `company_name` | `String` | No | Registered company name from VIES |
| `country_code` | `String` | Yes | Two-letter ISO country code |
| `country_name` | `String` | Yes | Full country name |
| `id` | `String` | No |  |
| `source` | `String` | Yes | Source of validation data |
| `valid` | `Boolean` | Yes | Whether the VAT number is valid according to VIES |
| `vat_number` | `String` | Yes | VAT number without country code prefix |
| `vat_number_full` | `String` | Yes | Full VAT number including country code prefix |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

