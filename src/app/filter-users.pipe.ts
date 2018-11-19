import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user'

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], search?: string): any {
    if (!users)
      return [];
    if (!search)
      return users;

    search = search.toLowerCase();
    return users.filter(user => user.name.toLowerCase().includes(search));
  }

}
