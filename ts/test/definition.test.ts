import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "validate_format",
    "accessor": "ValidateFormat",
    "op": "load",
    "method": "GET",
    "path": "/vat/validate-format/{country}/{number}",
    "args": [
      {
        "name": "country",
        "wire": "country",
        "value": "DE"
      },
      {
        "name": "number",
        "wire": "number",
        "value": "190119364"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [],
    "status": 200,
    "sample": {
      "valid": true,
      "country_code": "DE",
      "country_name": "Germany",
      "vat_number": "190119364",
      "vat_number_full": "DE190119364",
      "checked_at": "2026-04-26T12:00:00+00:00",
      "source": "format_check"
    },
    "idField": "id"
  },
  {
    "entity": "vat",
    "accessor": "Vat",
    "op": "load",
    "method": "GET",
    "path": "/vat/{country}/{number}",
    "args": [
      {
        "name": "country",
        "wire": "country",
        "value": "DE"
      },
      {
        "name": "number",
        "wire": "number",
        "value": "190119364"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "valid": true,
      "country_code": "DE",
      "country_name": "Germany",
      "vat_number": "190119364",
      "vat_number_full": "DE190119364",
      "company_name": "EXAMPLE GMBH",
      "company_address": "Musterstrasse 1\n10115 Berlin",
      "checked_at": "2026-04-26T12:00:00+00:00",
      "source": "VIES"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
