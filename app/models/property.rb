class Property
  include Mongoid::Document

  belongs_to :resource, inverse_of: :properties

  field :type, type: String
  field :label, type: String
  field :value, type: String

  validates :type, presence: true
  validates :label, presence: true
  validates :value, presence: true
end
