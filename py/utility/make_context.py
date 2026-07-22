# EuVatValidation SDK utility: make_context

from core.context import EuVatValidationContext


def make_context_util(ctxmap, basectx):
    return EuVatValidationContext(ctxmap, basectx)
