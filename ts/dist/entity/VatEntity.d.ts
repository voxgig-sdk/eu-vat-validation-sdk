import { EuVatValidationEntityBase } from '../EuVatValidationEntityBase';
import type { EuVatValidationSDK } from '../EuVatValidationSDK';
import type { Control } from '../types';
import type { Vat, VatLoadMatch } from '../EuVatValidationTypes';
declare class VatEntity extends EuVatValidationEntityBase<Vat> {
    constructor(client: EuVatValidationSDK, entopts: any);
    make(this: VatEntity): VatEntity;
    load(this: any, reqmatch?: VatLoadMatch, ctrl?: Control): Promise<VatEntity>;
}
export { VatEntity };
