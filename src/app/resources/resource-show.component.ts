import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService
    ) {
    // this.buildForm();
    // this.subcribeToFormChanges();
  }

  buildForm() {
    let group = {
      title: ['', [<any>Validators.required]],
      template_filename: ['', [<any>Validators.required]]
    };
    // this.resourceForm = this.fb.group(group);
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
}
