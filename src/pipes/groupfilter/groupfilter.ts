import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GroupfilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filtroGrupos',
  pure: false
})
export class GroupfilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
    transform(items:Array<any>, conditions:Array<any>): Array<any>{
        var result=[];
        console.log(items);
        console.log(conditions);
        for(var index in items) {
          
          if(items[index].id_grupos==0){

               result.push(items[index]);
            }else{
               conditions.forEach(function(element) {          
                 if (element==items[index].id_grupos){
                   result.push(items[index]);
                 }
               }); 
            }
        }
        console.log(JSON.stringify(result));
        return result 
        

    }
}
