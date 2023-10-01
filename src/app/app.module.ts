import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ForbiddenPageComponent } from './core/components/forbidden-page/forbidden-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
