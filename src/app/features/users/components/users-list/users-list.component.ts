import {Component, Input} from '@angular/core';
import {IUser} from "../../../../core/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: IUser[] | null = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  selectUser(user: IUser): void {
    const userId = user ? user.id : null;
    this.router.navigate([`/users/${userId}`]);
  }

}
