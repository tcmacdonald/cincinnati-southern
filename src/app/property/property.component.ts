import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../resources/resource';
import { Property } from './property';

@Component({
  selector: 'resource-property',
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {

  prop: Object;
  property: any;

  @Input()
  id: string;

  @Input()
  resource: Resource;

  constructor() {
    this.prop = {};
  }

  ngOnInit() {
    this.property = this.resource.properties_attributes[this.id];
    this.prop[this.id] = this.property[this.id];
  }

  private onChange(e) {
    this.property['table']['body'] = this.prop[this.id];
  }

  private value() {
    return this.property['table']['body'];
  }

  private type() {
    return this.property['table']['property_type'];
  }

}
