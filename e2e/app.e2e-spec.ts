import { ExampleClientPage } from './app.po';

describe('example-client App', () => {
  let page: ExampleClientPage;

  beforeEach(() => {
    page = new ExampleClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
