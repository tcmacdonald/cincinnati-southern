import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule }   from '@angular/forms';
import { ResourceService } from "./resource.service";
import { ResourceShowComponent } from './resource-show.component';

describe('ResourceShowComponent', () => {
  let component: ResourceShowComponent;
  let fixture: ComponentFixture<ResourceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourceShowComponent
      ],
      providers: [
        ResourceService
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule
      ]
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
