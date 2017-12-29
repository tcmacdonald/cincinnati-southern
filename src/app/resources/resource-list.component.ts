import { Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from "./resource.service";
import { Resource } from "./resource";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-resources',
  templateUrl: './resource-list.component.html'
})
export class ResourceListComponent implements OnInit {
  resources: Resource[];
  errorMessage: any;
  returnUrl: string = '/resources';

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resourceService.getResources()
      .subscribe((resources) => {
        this.resources = resources;
      });
  }

  delete(resource: Resource) {
    if(confirm('Are you sure?')) {
      this.resourceService.deleteResource(resource.id)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => this.errorMessage = error
      );
    } else {
      return false;
    }
  }
}
