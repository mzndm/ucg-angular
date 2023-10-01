import {Component} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {MessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService
    ) {
  }

  public message$ = this.messageService.message$;
  public users$ = this.dataService.getUsers();
}

