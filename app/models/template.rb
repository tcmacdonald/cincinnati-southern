# Represents the properties and configuration of a template
class Template

  include ActiveSupport::Inflector

  # Full path to the template file.
  attr_accessor :path

  # Path to view file from Rails.root.
  attr_accessor :view_path

  # File contents
  attr_accessor :content

  # Parsed YAML object
  attr_accessor :frontmatter

  # Basename of path, excluding extension
  attr_accessor :filename

  # String identifing the target layout, if defined
  attr_accessor :layout

  # Array containing template regions
  attr_accessor :regions

  def initialize(path: nil, yaml: nil)
    if yaml.present?
      @content = yaml
    else
      @path = path.to_s
      @filename = @path[/([a-zA-Z0-9\-_]+:?).(html|js).erb/, 1]
      @view_path = @path[/(app\/views\/)(.+:?).(html|js).erb/, 2]
      @content = File.read(@path)
    end
    @regions = []
    parse_yaml
  end

  # Direct access to the frontmatter
  def method_missing(method, *args, &block)
    @frontmatter[method.to_sym]
  end

  protected

    def parse_yaml
      @frontmatter = {}
      if @content =~ /^(<%# ---\s+)(.*?)(\s+--- %>)/m
        @frontmatter = YAML.load($2).with_indifferent_access
        @layout = @frontmatter.try(:[], 'layout')
        if @frontmatter.try(:[], 'regions').present?
          parse_regions()
        end
        remove_instance_variable(:@content)
      end
    end

    def parse_regions
      @frontmatter.try(:[], 'regions').each do |region,opts|
        details = {
          features: opts.try(:[], 'features') || @frontmatter.try(:[], :features)
        }
        if opts.is_a?(String)
          details[:label] = opts
        else
          details[:label] = opts.try(:[], 'label') || region.to_s.humanize
        end
        @regions.push [region, details]
      end
    end

end