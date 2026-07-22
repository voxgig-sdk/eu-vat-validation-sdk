package core

type EuVatValidationError struct {
	IsEuVatValidationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEuVatValidationError(code string, msg string, ctx *Context) *EuVatValidationError {
	return &EuVatValidationError{
		IsEuVatValidationError: true,
		Sdk:              "EuVatValidation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EuVatValidationError) Error() string {
	return e.Msg
}
