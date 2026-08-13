# EuVatValidation SDK feature factory

from euvatvalidation_sdk.feature.base_feature import EuVatValidationBaseFeature
from euvatvalidation_sdk.feature.test_feature import EuVatValidationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EuVatValidationBaseFeature(),
        "test": lambda: EuVatValidationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
