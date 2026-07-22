# EuVatValidation Python SDK Reference

Complete API reference for the EuVatValidation Python SDK.


## EuVatValidationSDK

### Constructor

```python
from euvatvalidation_sdk import EuVatValidationSDK

client = EuVatValidationSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EuVatValidationSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = EuVatValidationSDK.test()
```


### Instance Methods

#### `ValidateFormat(data=None)`

Create a new `ValidateFormatEntity` instance. Pass `None` for no initial data.

#### `Vat(data=None)`

Create a new `VatEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ValidateFormatEntity

```python
validate_format = client.ValidateFormat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `str` | Yes |  |
| `country_code` | `str` | Yes |  |
| `country_name` | `str` | Yes |  |
| `source` | `str` | Yes |  |
| `valid` | `bool` | Yes |  |
| `vat_number` | `str` | Yes |  |
| `vat_number_full` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ValidateFormat().load({"country": "country", "number": "number"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ValidateFormatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VatEntity

```python
vat = client.Vat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `checked_at` | `str` | Yes |  |
| `company_address` | `str` | No |  |
| `company_name` | `str` | No |  |
| `country_code` | `str` | Yes |  |
| `country_name` | `str` | Yes |  |
| `source` | `str` | Yes |  |
| `valid` | `bool` | Yes |  |
| `vat_number` | `str` | Yes |  |
| `vat_number_full` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Vat().load({"country": "country", "number": "number"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = EuVatValidationSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

