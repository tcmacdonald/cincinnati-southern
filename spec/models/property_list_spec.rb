require 'rails_helper'

describe PropertyList do

  before do
    @lorem = LoremObject.new
    @title = @lorem.words(5)
    args = {
      one: OpenStruct.new(title: 'some title'),
      two: OpenStruct.new(title: @title)
    }
    @properties = PropertyList.new(args.to_yaml)
  end

  it 'should instantiate a block for each key/value pair' do
    expect(@properties.one).to be_a(Property)
  end

  it 'should return block associated with each named key' do
    expect(@properties.two.title).to eq(@title)
  end

  it 'should return a YAML object' do
    expect(@properties.dump).to eq(@properties.to_yaml)
    expect(PropertyList.dump(@properties)).to eq(@properties.to_yaml)
  end

end