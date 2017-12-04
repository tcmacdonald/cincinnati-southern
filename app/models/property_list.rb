class PropertyList < HashWithIndifferentAccess

  # A PropertyList object instantiates one or more Property objects
  # from key/value pairs passed to the constructor method.
  # @param properties [Object]
  def initialize(properties = {})
    self.class.load(properties).each do |key,value|
      self[key] = Property.new(value)
    end
  end

  # Direct access to the property objects
  def method_missing(method, *args, &prop)
    self[method.to_sym]
  end

  # Returns YAML string representing self
  # @return [String]
  def dump
    self.class.dump(self)
  end

  # Returns YAML string representing the entire BlockList object.
  # @return [String]
  def self.dump(obj)
    return if obj.nil?
    list = PropertyList.new(obj)
    YAML.dump list
  end

  # Build Property objects from YAML.
  # @param yaml [String]
  # @return [String]
  def self.load(yaml)
    return PropertyList.new if yaml.nil?
    return yaml unless yaml.is_a?(String) && yaml =~ /^---/
    YAML.load(yaml)
  end

end