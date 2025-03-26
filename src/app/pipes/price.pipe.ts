import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true, // Standalone pipe
})
export class PricePipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toLocaleString('hu-HU')} Ft`;
  }
}
