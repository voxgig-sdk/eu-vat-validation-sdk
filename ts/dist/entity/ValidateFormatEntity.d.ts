import { EuVatValidationEntityBase } from '../EuVatValidationEntityBase';
import type { EuVatValidationSDK } from '../EuVatValidationSDK';
import type { Control } from '../types';
import type { ValidateFormat, ValidateFormatLoadMatch } from '../EuVatValidationTypes';
declare class ValidateFormatEntity extends EuVatValidationEntityBase<ValidateFormat> {
    constructor(client: EuVatValidationSDK, entopts: any);
    make(this: ValidateFormatEntity): ValidateFormatEntity;
    load(this: any, reqmatch?: ValidateFormatLoadMatch, ctrl?: Control): Promise<ValidateFormatEntity>;
}
export { ValidateFormatEntity };
