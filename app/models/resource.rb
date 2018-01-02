class Resource
  include Mongoid::Document

  field :title, type: String
  field :permalink, type: String

  validates :title, presence: true
  validates :permalink, presence: true, uniqueness: true

  has_many :properties, class_name: 'Property'

  accepts_nested_attributes_for :properties

  before_validation do
    self.permalink = self.title.to_slug.normalize.to_s if self.permalink.nil?
  end
end
