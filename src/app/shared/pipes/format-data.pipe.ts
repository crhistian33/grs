import { Pipe, PipeTransform } from '@angular/core';
import { RelationType } from '@shared/models/bases/table-headers.model';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

  transform(value: unknown, type?: string, ): string {
    if (value === null || value === undefined) return '';

    switch(type) {
      case 'currency':
        return this.getCurrency(value);
      case 'entityName':
        return this.getRelationName(value);
      case 'entityNames':
        return this.getRelationNames(value);
      default:
        return String(value);
    }
  }

  private getCurrency(value: any) {
    const numericValue = Number(value);
    const formattedValue = numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `S/. ${formattedValue}`;
  }

  private getRelationName(value: any): string {
    if (value && typeof value === 'object' && 'name' in value) {
      return (value as RelationType)['name'];
    }
    return '';
  }

  private getRelationNames(values: any): string {
    const fields = values.map((item: any) => item.name);
    return fields.join(', ');
  }
}
