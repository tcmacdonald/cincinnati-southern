import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ResourceListComponent } from "./resources/resource-list.component";
import { ResourceShowComponent } from "./resources/resource-show.component";
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "", redirectTo: '/resources', pathMatch: 'full' },
  { path: "resources",      component: ResourceListComponent },
  { path: 'resources/:id',   component: ResourceShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}