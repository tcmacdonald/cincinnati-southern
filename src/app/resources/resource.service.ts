import { Injectable, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Resource } from './resource';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ResourceService implements OnInit {
  private resourcesUrl = 'http://localhost:3000/resources';
  resources: Resource[];
  id: number;

  constructor(private route: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.id = +params['id']);
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers })
  }

  getResources() : Observable<Resource[]> {
    return this.get(this.resourcesUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getResource(id) : Observable<Resource[]> {
    return this.get(`${this.resourcesUrl}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createResource(resource: Resource): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.resourcesUrl, JSON.stringify(resource), options);
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Token token=KN2UMK4r7nXatQetFIvUxwtt');
  }
}
