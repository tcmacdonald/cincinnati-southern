import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule }   from '@angular/forms';
import { ResourceService } from './resource.service';
import { ResourceNewComponent } from './resource-new.component';
import { Resource } from 'app/resources/resource';

describe('ResourceNewComponent', () => {
  let component: ResourceNewComponent;
  let fixture: ComponentFixture<ResourceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourceNewComponent
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
    fixture = TestBed.createComponent(ResourceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
