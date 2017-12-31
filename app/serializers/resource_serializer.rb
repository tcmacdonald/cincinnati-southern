class ResourceSerializer < ActiveModel::Serializer

  def attributes(requested_attrs = nil, reload = false)
    data = super
    self.object.dynamic_attributes.each do |attr|
      if attr == '_id'
        data[:id] = object.id.to_s
      else
        data[attr] = object.send(attr.to_sym)
      end
    end
    data
  end

end
