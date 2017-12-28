import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourceService
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});
