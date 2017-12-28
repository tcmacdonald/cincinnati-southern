import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Datastore } from "../services/datastore.service";
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
    // console.log(this.id);
    this.resourceService.getResource(this.id).subscribe(
        (resource: any) => {
          // console.log(resource);
          this.resource = resource;
          // this.appendPropertyControls();
          // this.populateForm();
        }
      );
    // this.datastore.findRecord(Resource, this.id).subscribe(
    //   (resource: Resource) => {
    //     this.resource = resource;
    //     this.appendPropertyControls();
    //     this.populateForm();
    //   }
    // );
  }

  appendPropertyControls() {
    _.forEach(this.resource.properties, (property, key) => {
      let prop = property['table'].body;
      let ctrl = new FormControl(key, []);
      this.resourceForm.addControl(key, ctrl);
      this.resourceProperties[key] = prop;
    });
  }

  populateForm() {
    _.forEach(['title', 'template_filename'], (v,k) => {
      (<FormControl>this.resourceForm.get(v)).setValue(this.resource[v], { onlySelf: true });
    });
    _.forEach(this.resourceProperties, (v,k) => {
      (<FormControl>this.resourceForm.get(v)).setValue(this.resource[v], { onlySelf: true });
    });
  }

  // subcribeToFormChanges() {
  //   const resourceFormStatusChanges$ = this.resourceForm.statusChanges;
  //   const resourceFormValueChanges$ = this.resourceForm.valueChanges;

  //   resourceFormStatusChanges$.subscribe(x => console.log(x));
  //   resourceFormValueChanges$.subscribe(x => console.log(x));
  // }

  save(model: Resource, isValid: boolean) {
    this.resource.updateAttributes(model);
    console.log('>>>>', this.resource);
    this.resource.save().subscribe((resource: Resource) => {
      console.log('----->', resource);
    });
  }
}
