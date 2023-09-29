import {Component, Input} from '@angular/core';
import {IUser} from "../../../../core/models";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: IUser[] | null = [];

  createUser(): void {
    console.log('createUser click');
  }

  selectUser(user: IUser): void {
    console.log('selectUser click', user)
  }

}
