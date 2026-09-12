import { inspect } from 'node:util';
import { EuVatValidationSDK } from './EuVatValidationSDK';
import { Utility } from './utility/Utility';
import type { Context } from './types';
declare class EuVatValidationEntityBase<D = any> {
    name: string;
    name_: string;
    Name: string;
    _client: EuVatValidationSDK;
    _utility: Utility;
    _entopts: any;
    _data: Partial<D>;
    _match: Partial<D>;
    _entctx: Context;
    _deleted: boolean;
    constructor(client: EuVatValidationSDK, entopts: any);
    markDeleted(this: any): void;
    deleted(this: any): boolean;
    entopts(): any;
    client(): EuVatValidationSDK;
    data(this: any, data?: Partial<D>): D;
    match(this: any, match?: Partial<D>): Partial<D>;
    stream(this: any, action: string, args?: any, callopts?: any): AsyncGenerator<any>;
    toJSON(): any;
    toString(): string;
    [inspect.custom](): string;
    _unexpected(this: any, ctx: Context, err: any): any;
}
export { EuVatValidationEntityBase };
