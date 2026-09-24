

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EuVatValidationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ValidateFormatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EU_VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('EU_VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EuVatValidationSDK.test()
    const ent = testsdk.ValidateFormat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EU_VAT_VALIDATION_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'validate_format.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"checked_at":{"a":true,"fo":"date-time","h":"Checked At","n":"checked_at","r":true,"sh":"Timestamp of the validation check","t":"`$STRING`","key$":"checked_at","index$":0},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":true,"sh":"Two-letter ISO country code","t":"`$STRING`","key$":"country_code","index$":1},"country_name":{"a":true,"h":"Country Name","n":"country_name","r":true,"sh":"Full country name","t":"`$STRING`","key$":"country_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Source of validation","t":"`$STRING`","key$":"source","index$":4},"valid":{"a":true,"h":"Valid","n":"valid","r":true,"sh":"Whether the VAT number format is valid according to country-specific rules","t":"`$BOOLEAN`","key$":"valid","index$":5},"vat_number":{"a":true,"h":"Vat Number","n":"vat_number","r":true,"sh":"VAT number without country code prefix","t":"`$STRING`","key$":"vat_number","index$":6},"vat_number_full":{"a":true,"h":"Vat Number Full","n":"vat_number_full","r":true,"sh":"Full VAT number including country code prefix","t":"`$STRING`","key$":"vat_number_full","index$":7}},"id":{"field":"id","from":{"country":"country_name"},"name":"id","parts":["country","number"],"sep":"/"},"name":"validate_format","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /vat/validate-format/{country}/{number}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"DE","k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"190119364","k":"param","n":"number","or":"number","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/vat/validate-format/{country}/{number}","q":{"exist":["country","number"]},"r":{},"s":[{"lit":"vat"},{"lit":"validate-format"},{"var":"country"},{"var":"number"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"validate_format","name__orig":"validate_format","Name":"ValidateFormat","name_":"validate_format","name-":"validate-format","NAME":"VALIDATE_FORMAT","index$":0}, {"active":true,"entity":"validate_format","key$":"BasicValidateFormatFlow","kind":"basic","name":"BasicValidateFormatFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"validate_format_ref01","srcdatavar":"validate_format_ref01_data","suffix":"_dt0"},"m":{"country":"country01","id":"validate_format01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validate_format_ref01"}}],"index$":0}]}, 'ValidateFormat', {"GET /vat/validate-format/{country}/{number}":{"protocol":"http","operationId":"validateVatFormat","responses":{"200":{"description":"Successful format validation response","content":{"application/json":{"schema":{"type":"object","properties":{"valid":{"type":"boolean","description":"Whether the VAT number format is valid according to country-specific rules","key$":"valid"},"country_code":{"type":"string","description":"Two-letter ISO country code","example":"DE","key$":"country_code"},"country_name":{"type":"string","description":"Full country name","example":"Germany","key$":"country_name"},"vat_number":{"type":"string","description":"VAT number without country code prefix","example":"190119364","key$":"vat_number"},"vat_number_full":{"type":"string","description":"Full VAT number including country code prefix","example":"DE190119364","key$":"vat_number_full"},"checked_at":{"type":"string","format":"date-time","description":"Timestamp of the validation check","example":"2026-04-26T12:00:00+00:00","key$":"checked_at"},"source":{"type":"string","description":"Source of validation","enum":["format_check"],"example":"format_check","key$":"source"}},"required":["valid","country_code","country_name","vat_number","vat_number_full","checked_at","source"],"x-ref":"#/components/schemas/VatFormatValidationResponse","index$":0},"example":{"valid":true,"country_code":"DE","country_name":"Germany","vat_number":"190119364","vat_number_full":"DE190119364","checked_at":"2026-04-26T12:00:00+00:00","source":"format_check"}}}},"400":{"description":"Bad request - invalid country code or VAT number format","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"},"message":{"type":"string","description":"Detailed error information"}},"required":["error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"country","in":"path","required":true,"description":"Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)","schema":{"type":"string","pattern":"^[A-Z]{2}$","example":"DE"},"index$":0},{"name":"number","in":"path","required":true,"description":"VAT number without country code prefix","schema":{"type":"string","example":"190119364"},"index$":1}],"security":[],"securitySource":"operation","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key for authentication. Get your key at https://kiprio.com/vat-api/"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let validate_format_ref01_data = Object.values(setup.data.existing.validate_format)[0] as any

    // LOAD
    const validate_format_ref01_ent = client.ValidateFormat()
    const validate_format_ref01_match_dt0: any = {}
    validate_format_ref01_match_dt0.id = validate_format_ref01_data.id
    const validate_format_ref01_data_dt0 = (await validate_format_ref01_ent.load(validate_format_ref01_match_dt0)).data()
    assert(validate_format_ref01_data_dt0.id === validate_format_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/validate_format/ValidateFormatTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EuVatValidationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['validate_format01','validate_format02','validate_format03','country01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID': idmap,
    'EU_VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'EU_VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
    'EU_VAT_VALIDATION_APIKEY': '',
  })

  idmap = env['EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID']

  const live = 'TRUE' === env.EU_VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EU_VAT_VALIDATION_TEST_VALIDATE_FORMAT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EuVatValidationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.EU_VAT_VALIDATION_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EU_VAT_VALIDATION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
