import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Resource } from './resource';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-resource-new',
  templateUrl: './resource-new.component.html'
})
export class ResourceNewComponent {
  resource = new Resource;
  submitted: boolean = false;

  constructor(
    private resourceService: ResourceService
  ) {}

  createResource(resource: Resource) {
    this.submitted = true;
    this.resourceService.createResource(resource)
        .subscribe(
          data => { return true },
          error => {
            console.log("Error creating resource");
            return Observable.throw(error);
          });
  }
}
