import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { JsonApiModule } from 'angular2-jsonapi';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { ResourceService } from './resources/resource.service';
import { ResourceListComponent } from './resources/resource-list.component';
import { ResourceShowComponent } from './resources/resource-show.component';

// import { ResourceComponent } from './components/resource/resource.component';
// import { Datastore } from './services/datastore.service';

@NgModule({
  declarations: [
    AppComponent,
    ResourceListComponent,
    ResourceShowComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {}
}
