import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Resource } from "./resource";
import { ResourceService } from './resource.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-show.component.html'
})
export class ResourceShowComponent implements OnInit {
  id: string;
  resource: Resource;
  resourceForm: FormGroup;
  resourceProperties: Array<any> = [];
  errorMessage: any;
  returnUrl: string = '/resources';
  editBtnClicked: boolean = false;
  submitted: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
    ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadResource();
    });
  }

  loadResource() {
    this.resourceService.getResource(this.id).subscribe((resource: Resource) => this.resource = resource);
  }

  update(resource: Resource) {
    this.submitted = true;
    this.resourceService.updateResource(resource)
        .subscribe(
          data => { return true },
          error => {
            console.log("Error Editing Resource");
            return Observable.throw(error);
          });
  }
}
