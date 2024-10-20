import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../Services/user.service';

@Pipe({
  name: 'filteruser'
})
export class FilteruserPipe implements PipeTransform {

  transform(value: User[], ...args: string[]): User[] {
    let searchText = args[0];

    return value.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.email.toLowerCase().includes(searchText.toLowerCase()));
  }

}
