import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceShowComponent } from './resource-show.component';

describe('ResourceComponent', () => {
  let component: ResourceShowComponent;
  let fixture: ComponentFixture<ResourceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
