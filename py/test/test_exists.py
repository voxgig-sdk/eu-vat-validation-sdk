# ProjectName SDK exists test

import pytest
from euvatvalidation_sdk import EuVatValidationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EuVatValidationSDK.test(None, None)
        assert testsdk is not None
