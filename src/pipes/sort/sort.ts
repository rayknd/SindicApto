import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  
  transform(array: Array<string>, args?: any): Array<string> {
    if(array !== undefined){
      return array.sort(function(a, b){
        if(a[args.property] < b[args.property]){
          return 1 * args.order;
        }
        else if( a[args.property] > b[args.property]){
          return -1 * args.order;
        }
        else{
          return 0;
        }
    
      });
    }
  }
}
