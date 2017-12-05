require 'spec_helper'

shared_examples_for 'composeable' do
  let(:model) { described_class }
  let(:obj) { FactoryGirl.create(model.to_s.underscore.to_sym) }

  it 'should assign a property list to properties attr' do
    expect(obj.properties).to be_a(PropertyList)
  end

  context 'parsing new properties' do

    before do
      obj.send(:parse_properties, some_field: 'string')
    end

    it 'should initialize new properties' do
      expect(obj.properties.some_field).to be_a(Property)
      expect(obj.properties.some_field.property_type).to eq('string')
    end

  end

  context 'parsing existing properties' do

    before do
      @existing_properties = {
        custom_name: OpenStruct.new(property_type: 'string', body: 'Lorem Ipsum'),
        favorite_movie: OpenStruct.new(property_type: 'select', body: 'Dr. Strangelove'),
        color: OpenStruct.new(property_type: 'select', body: nil)
      }
      @property_types = {
        some_field: 'string',
        custom_name: 'string',
        favorite_movie: ['Dr. Strangelove','True Grit','Gandhi']
      }
      obj.properties = PropertyList.new(@existing_properties)
      obj.send(:parse_properties, @property_types)
    end

    it 'should return body' do
      expect(obj.properties.dig(:custom_name, :body)).to eq(@existing_properties.dig(:custom_name, :body))
    end

    it 'should return property_options when property_type is an array' do
      opts = obj.properties.dig(:favorite_movie, :property_options)
      expect(opts.class).to eq(Array)
      expect(opts).to eq(@property_types.dig(:favorite_movie))
    end

  end

  context 'parsing options' do

    it 'should return select for an array' do
      opts = ['one', 'two', 'three']
      definition = obj.send(:parse_options, 'testing', opts)
      expect(definition.try(:[], :property_options)).to eq(opts)
    end

    it 'should return collection_select for an ActiveRecord class' do
      definition = obj.send(:parse_options, 'testing', Resource)
      expect(definition.try(:[], :property_klass)).to eq(Resource)
      expect(definition.try(:[], :property_type)).to eq(:collection_select)
    end

    it 'should return select for a Proc' do
      opts = ['one', 'two', 'three']
      definition = obj.send(:parse_options, 'testing', Proc.new { opts })
      expect(definition.try(:[], :property_options)).to eq(opts)
    end

  end

  it 'should respond to self.is_composeable?' do
    expect(model.respond_to?(:is_composeable?)).to be_truthy
  end

end