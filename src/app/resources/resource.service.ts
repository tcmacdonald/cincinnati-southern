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
  headers: Headers;
  options: RequestOptions;

  constructor(
    private route: ActivatedRoute,
    private http: Http
  ) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Token token=KN2UMK4r7nXatQetFIvUxwtt'
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.id = +params['id']);
  }

  get(url) {
    return this.http.get(url, this.options);
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
    return this.http.post(this.resourcesUrl, JSON.stringify(resource), this.options);
  }

  deleteResource(id: number): Observable<Resource> {
    const url = `${this.resourcesUrl}/${id}`;
    return this.http.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateResource(resource: Resource): Observable<Resource> {
    const url = `${this.resourcesUrl}/${resource.id}`;
    return this.http.put(url, JSON.stringify(resource),
            this.options).map((res: Response) => res.json())
                          .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
