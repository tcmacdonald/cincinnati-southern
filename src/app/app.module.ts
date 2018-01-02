import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from "@angular/router";
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { ResourceService } from './resources/resource.service';
import { ResourceListComponent } from './resources/resource-list.component';
import { ResourceShowComponent } from './resources/resource-show.component';
import { ResourceNewComponent } from './resources/resource-new.component';
import { PropertyComponent } from './property/property.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourceListComponent,
    ResourceShowComponent,
    ResourceNewComponent,
    PropertyComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
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
