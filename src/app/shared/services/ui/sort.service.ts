import { Injectable } from '@angular/core';
import { Sort } from '@shared/models/ui/sort.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  /**
   * Ordena un array de objetos por una propiedad de fecha específica
   */
  sortByDateField<T>(
    items: T[],
    configSort: Sort<T>
  ): T[] {
    if (!items || items.length === 0) return [];

    return [...items].sort((a, b) => {
      const dateA = a[configSort.field];
      const dateB = b[configSort.field];
      let comparison = 0;

      switch(configSort.type) {
        case 'date':
          comparison = this.compareDates(dateA as string, dateB as string, 'es');
          break;
        case 'string':
          comparison = this.compareStrings(dateA as string, dateB as string);
          break;
      }

      return configSort.direction ? comparison : -comparison;
    });
  }

  private compareDates(dateA: string, dateB: string, format: 'es' | 'iso'): number {
    const parsedDateA = this.parseDate(dateA, format);
    const parsedDateB = this.parseDate(dateB, format);

    return parsedDateA.getTime() - parsedDateB.getTime();
  }

  /**
   * Convierte una cadena de fecha al formato Date de JavaScript
   */
  private parseDate(dateString: string, format: 'es' | 'iso'): Date {
    if (format === 'es') {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    } else {
      return new Date(dateString);
    }
  }

  /**
   * Compara dos strings
   */
  private compareStrings(strA: string, strB: string): number {
    strA = strA.toLowerCase();
    strB = strB.toLowerCase();

    return strA.localeCompare(strB);
  }
}
