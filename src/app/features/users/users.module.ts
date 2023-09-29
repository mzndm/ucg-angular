import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UsersPageComponent,
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersPageComponent,
        children: [
          {
            path: 'new',
            component: UsersFormComponent
          },
          {
            path: ':id',
            component: UsersFormComponent
          },
        ]
      },
    ])
  ]
})
export class UsersModule { }
