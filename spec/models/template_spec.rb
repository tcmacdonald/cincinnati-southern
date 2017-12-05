require 'rails_helper'

RSpec.describe Template, type: :model do

  it 'should parse front-matter' do
    tpl = Template.new(yaml: "<%# ---\nname: Default\n--- %>")
    expect(tpl.name).to eq('Default')
  end

  tpl = Template.new(path: File.join(Rails.root, 'app', 'views', 'templates', 'resources', 'default.html.erb'))
  it 'should parse template path' do
    expect(tpl.filename).to eq('default')
    expect(tpl.view_path).to eq('templates/resources/default')
  end

  it 'should expose parameters from frontmatter' do
    tpl = Template.new(yaml: "<%# ---\none: One\ntwo: Two\n--- %>")
    expect(tpl.one).to eq('One')
    expect(tpl.two).to eq('Two')
  end

  context 'with regions' do

    it 'should parse regions by string' do
      tpl = Template.new(yaml: "<%# ---\nname: Default\nregions:\n  - Region One\n--- %>")
      expect(tpl.regions.first).to eq([ 'Region One', features: nil, label: 'Region One'.humanize ])
    end

    it 'should parse regions by object' do
      tpl = Template.new(yaml: "<%# ---\nname: Default\nregions:\n  primary:\n    label: 'Region One'\n    features: []\n--- %>")
      expect(tpl.regions.first).to eq([ 'primary', features: [], label: 'Region One' ])
    end

  end

end
