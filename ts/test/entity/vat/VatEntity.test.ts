

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EuVatValidationSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('VatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EU_VAT_VALIDATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('EU_VAT_VALIDATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EuVatValidationSDK.test()
    const ent = testsdk.Vat()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EuVatValidationSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Vat().load({"country":1,"number":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EU_VAT_VALIDATION_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"checked_at":{"a":true,"fo":"date-time","h":"Checked At","n":"checked_at","r":true,"sh":"Timestamp of the validation check","t":"`$STRING`","key$":"checked_at","index$":0},"company_address":{"a":true,"h":"Company Address","n":"company_address","r":false,"sh":"Registered company address from VIES","t":"`$STRING`","key$":"company_address","index$":1},"company_name":{"a":true,"h":"Company Name","n":"company_name","r":false,"sh":"Registered company name from VIES","t":"`$STRING`","key$":"company_name","index$":2},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":true,"sh":"Two-letter ISO country code","t":"`$STRING`","key$":"country_code","index$":3},"country_name":{"a":true,"h":"Country Name","n":"country_name","r":true,"sh":"Full country name","t":"`$STRING`","key$":"country_name","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Source of validation data","t":"`$STRING`","key$":"source","index$":6},"valid":{"a":true,"h":"Valid","n":"valid","r":true,"sh":"Whether the VAT number is valid according to VIES","t":"`$BOOLEAN`","key$":"valid","index$":7},"vat_number":{"a":true,"h":"Vat Number","n":"vat_number","r":true,"sh":"VAT number without country code prefix","t":"`$STRING`","key$":"vat_number","index$":8},"vat_number_full":{"a":true,"h":"Vat Number Full","n":"vat_number_full","r":true,"sh":"Full VAT number including country code prefix","t":"`$STRING`","key$":"vat_number_full","index$":9}},"id":{"field":"id","from":{"country":"country_name"},"name":"id","parts":["country","number"],"sep":"/"},"name":"vat","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /vat/{country}/{number}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"DE","k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"190119364","k":"param","n":"number","or":"number","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/vat/{country}/{number}","q":{"exist":["country","number"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"vat"},{"var":"country"},{"var":"number"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"vat","name__orig":"vat","Name":"Vat","name_":"vat","name-":"vat","NAME":"VAT","index$":1}, {"active":true,"entity":"vat","key$":"BasicVatFlow","kind":"basic","name":"BasicVatFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"vat_ref01","srcdatavar":"vat_ref01_data","suffix":"_dt0"},"m":{"country":"country01","id":"vat01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vat_ref01"}}],"unreachable":true}]}, 'Vat', {"GET /vat/{country}/{number}":{"protocol":"http","parameters":[{"name":"country","in":"path","required":true,"description":"Two-letter ISO country code (e.g., DE, FR, NL, BE, IT, ES, PL, AT, SE, DK, or XI for Northern Ireland)","schema":{"type":"string","pattern":"^[A-Z]{2}$","example":"DE"},"index$":0},{"name":"number","in":"path","required":true,"description":"VAT number without country code prefix","schema":{"type":"string","example":"190119364"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vat_ref01_data = Object.values(setup.data.existing.vat)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/vat/VatTestData.json')

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
    ['vat01','vat02','vat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EU_VAT_VALIDATION_TEST_VAT_ENTID': idmap,
    'EU_VAT_VALIDATION_TEST_LIVE': 'FALSE',
    'EU_VAT_VALIDATION_TEST_EXPLAIN': 'FALSE',
    'EU_VAT_VALIDATION_APIKEY': '',
  })

  idmap = env['EU_VAT_VALIDATION_TEST_VAT_ENTID']

  const live = 'TRUE' === env.EU_VAT_VALIDATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EU_VAT_VALIDATION_TEST_VAT_ENTID']
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
  
