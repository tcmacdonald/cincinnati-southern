require 'rails_helper'

describe Property do

  it 'should observe defaults' do
    block = Property.new({ title: 'Title' }, { title: 'Default Title', subtitle: 'Default Subtitle' })
    expect(block.to_h.keys).to include(:subtitle)
    expect(block.title).to eq('Title')
    expect(block.subtitle).to eq('Default Subtitle')
  end

end