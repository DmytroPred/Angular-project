import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cashFormater'
})
export class CashFormaterPipe implements PipeTransform {

  transform(cash: string): any {
    console.log(+cash);
    if(+cash >= 1e6) {
      return `${Math.round(+cash / 1e5) / 10}M`;
    } else if(+cash >= 1e3)
      return `${Math.round(+cash / 1e2) / 10}K`;
  }

}