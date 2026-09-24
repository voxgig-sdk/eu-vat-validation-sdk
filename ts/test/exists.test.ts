
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuVatValidationSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EuVatValidationSDK.test()
    equal(testsdk instanceof EuVatValidationSDK, true,
      'EuVatValidationSDK.test() must return a client synchronously')
  })

})
