import {Component, Input} from '@angular/core';
import {IUser} from "../../../../core/models";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: IUser[] | null = [];

  activeUserId: string | undefined;

  constructor(
    private router: Router
  ) {
    this.findActiveUserId();
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.findActiveUserId());
  }

  findActiveUserId(): void {
    this.activeUserId = this.router.url.split('/')[2];
  }

  selectUser(user: IUser): void {
    const userId = user ? user.id : null;
    this.router.navigate([`/users/${userId}`]);
  }

}
