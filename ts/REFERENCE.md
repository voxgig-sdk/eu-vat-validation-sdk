# EuVatValidation TypeScript SDK Reference

Complete API reference for the EuVatValidation TypeScript SDK.


## EuVatValidationSDK

### Constructor

```ts
new EuVatValidationSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EuVatValidationSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = EuVatValidationSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `EuVatValidationSDK` instance in test mode.


### Instance Methods

#### `ValidateFormat(data?: object)`

Create a new `ValidateFormat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ValidateFormatEntity` instance.

#### `Vat(data?: object)`

Create a new `Vat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VatEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `EuVatValidationSDK.test()`.

**Returns:** `EuVatValidationSDK` instance in test mode.


---

## ValidateFormatEntity

```ts
const validate_format = client.ValidateFormat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `country_name` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `valid` | `boolean` | Yes |  |
| `vat_number` | `string` | Yes |  |
| `vat_number_full` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ValidateFormat().load({ country: 'country', number: 'number' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ValidateFormatEntity` instance with the same client and
options.

#### `client()`

Return the parent `EuVatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VatEntity

```ts
const vat = client.Vat()
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
| `valid` | `boolean` | Yes |  |
| `vat_number` | `string` | Yes |  |
| `vat_number_full` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Vat().load({ country: 'country', number: 'number' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VatEntity` instance with the same client and
options.

#### `client()`

Return the parent `EuVatValidationSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new EuVatValidationSDK({
  feature: {
    test: { active: true },
  }
})
```

