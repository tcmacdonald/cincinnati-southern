require 'active_support/concern'

# Associate a template with an ActiveRecord object.
# Assumes the following attributes... +template_filename+ (string), +properties+ (text)
module Templateable
  extend ActiveSupport::Concern

  included do
    include Composeable
    after_initialize :assign_default_template, :initialize_properties
  end

  ###---------------------------------------------------- Instance Methods

  # The object corresponding to +template_filename+ or the
  # default template if +template_filename+ is nil.
  def template
    @template ||= begin
      self.class.find_template_by_filename(template_filename) || self.class.find_template_by_filename(self.class.default_template_filename)
    end
  end

  def template=(template_obj)
    @template = template_obj
  end

  # This is used in the admin to build the form fields
  # based on the template frontmatter
  #
  # @see Composeable
  def initialize_properties
    self.properties = parse_properties(self.template.properties)
  end

  # Conditional setter to assign default template filename
  # for new objects.
  def assign_default_template
    (self.template_filename ||= self.class.default_template_filename) if self.respond_to?(:template_filename)
  end

  module ClassMethods

    # Derives namespace for templates based on implementing
    # object's class name, e.g. pages, posts, etc.
    # @return [String]
    def template_namespace
      @template_namespace ||= self.to_s.pluralize.underscore.to_sym
    end

    # Build Template objects for each file in the templates
    # directory.
    # @return [Array]
    def templates
      @templates ||= begin
        tpls = Dir.glob(template_path('*'))
        # Build Template objects and sort by filename.
        tpls.collect { |f| Template.new(path: f) }.sort { |x,y| x.filename <=> y.filename }
      end
    end

    # Returns template by filename, without extension.
    # @return [String]
    def find_template_by_filename(template_filename)
      self.templates.detect { |t| t.filename == template_filename }
    end

    # Returns default template
    # @return [Template]
    def default_template
      self.find_template_by_filename(self.default_template_filename)
    end

    # Returns the default template object for the current namespace.
    # @return [String]
    def default_template_path
      self.template_path('default')
    end

    # Returns the filename of the default template object.
    # @return [String]
    def default_template_filename
      File.basename(default_template_path, '.html.erb')
    end

    # Returns an array of template names and ids for use in a select element.
    # @return [Array]
    def templates_for_select
      self.templates.collect { |template| [template.name, template.filename] }
    end

    # Returns path to the application defined templates directory.
    # @return [String]
    def template_path(name)
      File.join(Rails.root, 'app', 'views', 'templates', self.template_namespace.to_s, "#{name}.html.erb")
    end

    # @return [true]
    def is_templateable?
      true
    end

  end

end