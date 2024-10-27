import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../Models/task';


@Pipe({
  name: 'filter'
})
export class FiltetTaskPipe implements PipeTransform {

  transform(value: Task[], ...args: string[]): Task[] {
    let searchText = args[0];

    return value.filter(item=> item.title.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase()));
  }

}


