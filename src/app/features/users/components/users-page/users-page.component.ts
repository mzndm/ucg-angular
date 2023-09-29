import { Component } from '@angular/core';
import {DataService} from "../../../../services/data.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  constructor(private dataService: DataService) {
  }

  public users$ = this.dataService.getUsers();
}
