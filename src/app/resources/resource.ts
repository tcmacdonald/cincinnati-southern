import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import * as _ from 'lodash';

@JsonApiModelConfig({
  type: 'resources'
})
export class Resource extends JsonApiModel {

  @Attribute()
  title: string;

  @Attribute()
  properties: Object;

  @Attribute()
  template_filename: string;

  toJSON() {
    return _.pick(this, ['title', 'template_filename']);
  }

  getProperty(k) {
    return this.properties[k]['table'];
  }

  updateAttributes(model) {
    _.each(model, (v,k) => {
      this[k] = v;
    });
    return this;
  }
}