package voxgigeuvatvalidationsdk

import (
	"github.com/voxgig-sdk/eu-vat-validation-sdk/go/core"
	"github.com/voxgig-sdk/eu-vat-validation-sdk/go/entity"
	"github.com/voxgig-sdk/eu-vat-validation-sdk/go/feature"
	_ "github.com/voxgig-sdk/eu-vat-validation-sdk/go/utility"
)

// Type aliases preserve external API.
type EuVatValidationSDK = core.EuVatValidationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EuVatValidationEntity = core.EuVatValidationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EuVatValidationError = core.EuVatValidationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewValidateFormatEntityFunc = func(client *core.EuVatValidationSDK, entopts map[string]any) core.EuVatValidationEntity {
		return entity.NewValidateFormatEntity(client, entopts)
	}
	core.NewVatEntityFunc = func(client *core.EuVatValidationSDK, entopts map[string]any) core.EuVatValidationEntity {
		return entity.NewVatEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEuVatValidationSDK = core.NewEuVatValidationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewEuVatValidationSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *EuVatValidationSDK  { return NewEuVatValidationSDK(nil) }
func Test() *EuVatValidationSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
