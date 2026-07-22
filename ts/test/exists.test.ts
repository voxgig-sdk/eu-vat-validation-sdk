
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuVatValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EuVatValidationSDK.test()
    equal(null !== testsdk, true)
  })

})
