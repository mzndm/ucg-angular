import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module')
          .then(module => module.UsersModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
