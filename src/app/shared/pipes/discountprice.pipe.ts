import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true  
})
export class DiscountPricePipe implements PipeTransform {
  transform(value: number, discountPercent: number): number {
    return value - (value * discountPercent / 100);
  }
}