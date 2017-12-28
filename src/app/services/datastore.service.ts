import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';

import { Resource } from '../resources/resource';

const config: DatastoreConfig = {
  baseUrl: 'http://localhost:3000',
  models: {
    resources: Resource
  }
}

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(http: Http) {
    super(http);
  }

}