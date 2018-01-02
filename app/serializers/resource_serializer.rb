class ResourceSerializer < ActiveModel::Serializer

  attributes :id, :title, :permalink

  has_many :properties, key: 'properties_attributes'

end
