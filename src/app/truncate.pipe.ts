import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, truncateParams: TruncateParams): any {
        if (!truncateParams || truncateParams.length <= 0 || value.length <= truncateParams.length)
            return value;
        return value.substr(0, truncateParams.length) + '...';
    }
}
export interface TruncateParams {
    length: number;
}