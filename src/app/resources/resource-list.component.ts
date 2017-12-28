import { Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from "./resource.service";
import { Resource } from "./resource";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-resources',
  templateUrl: './resource-list.component.html'
})
export class ResourceListComponent implements OnInit {
  resources: Resource[];

  constructor(private resourceService: ResourceService) {}

  ngOnInit() {
    this.resourceService.getResources()
      .subscribe((resources) => {
        this.resources = resources;
      });
  }
}
