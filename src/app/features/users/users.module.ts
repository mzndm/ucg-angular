import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';



@NgModule({
  declarations: [
    UsersPageComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersPageComponent,
      },
    ])
  ]
})
export class UsersModule { }
