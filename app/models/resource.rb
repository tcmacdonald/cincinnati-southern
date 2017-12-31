class Resource
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :title, type: String
  field :permalink, type: String

  validates :title, presence: true
  validates :permalink, presence: true, uniqueness: true

  def dynamic_attributes
    attributes.keys
  end

  def static_attributes
    fields.keys - dynamic_attributes
  end
end
