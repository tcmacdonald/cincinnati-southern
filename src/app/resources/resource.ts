export class Resource {
  constructor(
    public id?: number,
    public title?: string,
    public template_filename?: string,
    public updated_at?: string,
    public properties?: any,
  ) {}
}