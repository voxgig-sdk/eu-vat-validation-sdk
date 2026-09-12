import { ValidateFormatEntity } from './entity/ValidateFormatEntity';
import { VatEntity } from './entity/VatEntity';
export type * from './EuVatValidationTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EuVatValidationEntityBase } from './EuVatValidationEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class EuVatValidationSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ValidateFormat(entopts?: Record<string, any>): ValidateFormatEntity;
    Vat(entopts?: Record<string, any>): VatEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EuVatValidationSDK;
    tester(testopts?: any, sdkopts?: any): EuVatValidationSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EuVatValidationSDK;
export { stdutil, config, BaseFeature, EuVatValidationEntityBase, EuVatValidationSDK, SDK, };
