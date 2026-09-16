

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"checked_at","req":true,"short":"Timestamp of the validation check","type":"`$STRING`","index$":0},{"active":true,"name":"country_code","req":true,"short":"Two-letter ISO country code","type":"`$STRING`","index$":1},{"active":true,"name":"country_name","req":true,"short":"Full country name","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"source","req":true,"short":"Source of validation","type":"`$STRING`","index$":4},{"active":true,"name":"valid","req":true,"short":"Whether the VAT number format is valid according to country-specific rules","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"vat_number","req":true,"short":"VAT number without country code prefix","type":"`$STRING`","index$":6},{"active":true,"name":"vat_number_full","req":true,"short":"Full VAT number including country code prefix","type":"`$STRING`","index$":7}],"id":{"field":"id","from":{"country":"country_name"},"name":"id","parts":["country","number"],"sep":"/"},"name":"validate_format","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"DE","kind":"param","name":"country","orig":"country","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"190119364","kind":"param","name":"number","orig":"number","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /vat/validate-format/{country}/{number}","json":"{\"operationId\":\"validateVatFormat\",\"parameters\":[{\"description\":\"Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"DE\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}},{\"description\":\"VAT number without country code prefix\",\"in\":\"path\",\"name\":\"number\",\"required\":true,\"schema\":{\"example\":\"190119364\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"checked_at\":\"2026-04-26T12:00:00+00:00\",\"country_code\":\"DE\",\"country_name\":\"Germany\",\"source\":\"format_check\",\"valid\":true,\"vat_number\":\"190119364\",\"vat_number_full\":\"DE190119364\"},\"schema\":{\"properties\":{\"checked_at\":{\"description\":\"Timestamp of the validation check\",\"example\":\"2026-04-26T12:00:00+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"country_code\":{\"description\":\"Two-letter ISO country code\",\"example\":\"DE\",\"type\":\"string\"},\"country_name\":{\"description\":\"Full country name\",\"example\":\"Germany\",\"type\":\"string\"},\"source\":{\"description\":\"Source of validation\",\"enum\":[\"format_check\"],\"example\":\"format_check\",\"type\":\"string\"},\"valid\":{\"description\":\"Whether the VAT number format is valid according to country-specific rules\",\"type\":\"boolean\"},\"vat_number\":{\"description\":\"VAT number without country code prefix\",\"example\":\"190119364\",\"type\":\"string\"},\"vat_number_full\":{\"description\":\"Full VAT number including country code prefix\",\"example\":\"DE190119364\",\"type\":\"string\"}},\"required\":[\"valid\",\"country_code\",\"country_name\",\"vat_number\",\"vat_number_full\",\"checked_at\",\"source\"],\"type\":\"object\"}}},\"description\":\"Successful format validation response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error information\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid country code or VAT number format\"}},\"security\":[],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Get your key at https://kiprio.com/vat-api/\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/vat/validate-format/{country}/{number}","segments":[{"lit":"vat"},{"lit":"validate-format"},{"var":"country"},{"var":"number"}],"select":{"exist":["country","number"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["validate_format"]]},"key$":"validate_format","name__orig":"validate_format","Name":"ValidateFormat","name_":"validate_format","name-":"validate-format","NAME":"VALIDATE_FORMAT","index$":0}, {"active":true,"entity":"validate_format","key$":"BasicValidateFormatFlow","kind":"basic","name":"BasicValidateFormatFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"validate_format_ref01","srcdatavar":"validate_format_ref01_data","suffix":"_dt0"},"match":{"country":"country01","id":"validate_format01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-validate_format_ref01"}}],"index$":0}]}, 'ValidateFormat')
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
    ['validate_format01','validate_format02','validate_format03','validate_format01','validate_format02','validate_format03'],
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
  
