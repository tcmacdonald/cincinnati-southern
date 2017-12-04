# Properties are OpenStruct objects that
# can be serialized and unserialized.
# Each Property has a +block_type+ and a value (+body+).
class Property < OpenStruct

  def initialize(attrs = {}, defaults = {})
    super defaults.merge(attrs.to_h)
  end

  private

    def _defaults
      ({ body: '', block_type: 'string' })
    end

end