class Resource

  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :title, type: String
  field :permalink, type: String

  validates :title, presence: true
  validates :permalink, presence: true, uniqueness: true

  before_validation do
    self.permalink = self.title.to_slug.normalize.to_s if self.permalink.nil?
  end

  def dynamic_attributes
    attributes.keys
  end

  def static_attributes
    fields.keys - dynamic_attributes
  end
end
