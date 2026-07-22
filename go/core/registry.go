package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewValidateFormatEntityFunc func(client *EuVatValidationSDK, entopts map[string]any) EuVatValidationEntity

var NewVatEntityFunc func(client *EuVatValidationSDK, entopts map[string]any) EuVatValidationEntity

