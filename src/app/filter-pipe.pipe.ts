import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], term: string): any {
        return items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    }
}

