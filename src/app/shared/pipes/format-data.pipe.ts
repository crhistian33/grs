import { Pipe, PipeTransform } from '@angular/core';
import { RelationType } from '@shared/models/bases/table-headers.model';

@Pipe({
  name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

  transform(value: unknown, type?: string, ): string {
    if (value === null || value === undefined) return '';

    switch(type) {
      case 'entityName':
        return this.getRelationName(value);
      case 'entityNames':
        return this.getRelationNames(value);
      default:
        return String(value);
    }
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
