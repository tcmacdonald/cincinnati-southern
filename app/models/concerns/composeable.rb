require 'active_support/concern'

# To implement the Composeable concern, your model must
# have an attribute named +properties+.
module Composeable
  extend ActiveSupport::Concern

  included do
    serialize :properties, PropertyList
  end

  private

    # Parses template front-matter to derive what fields
    # should be exposed in the admin tool.
    # @param fields [Object]
    def parse_properties(fields)
      new_props = PropertyList.new

      # Loop through template's field definitions
      fields.each do |name, definition|
        opts = parse_options(name, definition)

        # If +properties+ attr includes a key with the
        # same name as the current field iteration, then
        # initialize the current property. Otherwise, initialize
        # a new +Property+.
        if self.properties.try(:[], name)
          property = Property.new(self.properties.try(:[], name), opts)

          # If current property_type is select, update property_options
          # so that any newly added options are reflected in the UI.
          if %w(select multiple).include?(opts[:property_type].to_s)
            property[:property_options] = opts[:property_options]
          end

        else
          property = Property.new(opts)
        end
        new_props[name] = property
      end

      # Initialize +properties+ attr with +PropertyList+
      self.properties = new_props
    end

    # Builds object containing properties related
    # to the current type.
    #
    # @param type [String]
    # @return [Hash]
    def parse_options(name, definition)
      type = definition.try(:type) || definition
      opts = {
        property_type: type,
        placeholder: definition.try(:placeholder),
        hint: definition.try(:hint),
        body: ''
      }

      # If type is an array, we can assume field should be a select element.
      if type.is_a?(Array)
        opts[:property_options] = definition.try(:collection) || type
        opts[:property_type] = :select
      # If type references a model, field should be a collection select
      elsif type.is_a?(Class) && (type.ancestors.include?(ActiveModel::Model) || type.new.kind_of?(ActiveRecord::Base))
        opts[:property_klass] = definition.try(:collection) || type
        opts[:property_type] = :collection_select
      # If proc or lambda...
      elsif type.is_a?(Proc) || definition.try(:collection).is_a?(Proc)
        opts[:property_options] = definition.try(:collection).try(:call) || type.call
        opts[:property_type] = type || :select
      end
      opts
    end

  module ClassMethods

    # @return [true]
    def is_composeable?
      true
    end

  end

end
