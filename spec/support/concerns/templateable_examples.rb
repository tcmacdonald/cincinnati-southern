require 'spec_helper'

shared_examples_for 'templateable' do
  let(:model) { described_class }
  let(:obj) { FactoryGirl.create(model.to_s.underscore.to_sym) }
  let(:default_tpl) { Template.new(path: model.default_template_path) }

  it 'should assign default template after initialize, unless template_filename is present' do
    expect(obj.template_filename).to eq('default')
    expect(obj.template.to_json).to eq(default_tpl.to_json)
  end

  it 'should initialize properties' do
    expect(obj.properties.keys).to include(obj.template.properties.keys.first)
  end

  it 'should return template namespace' do
    expect(model.template_namespace).to eq(model.to_s.underscore.pluralize.to_sym)
  end

  it 'should return all templates' do
    expect(model.templates.is_a?(Array)).to be_truthy
    expect(model.templates.first).to be_a(Template)
  end

  it 'should return template by filename' do
    expect(model.find_template_by_filename(model.default_template_filename).to_json).to eq(default_tpl.to_json)
  end

  it 'should return default template' do
    expect(model.default_template.to_json).to eq(default_tpl.to_json)
  end

  it 'should return default template filename' do
    expect(model.default_template_filename).to eq('default')
  end

  it 'should return all templates for select' do
    expect(model.templates_for_select).to eq([['Default', 'default']])
  end

  it 'should respond to is_templateable?' do
    expect(model.respond_to?(:is_templateable?)).to be_truthy
  end

end