class Consumer < ApplicationRecord

  # ------------------------ Validations

  validates_presence_of :api_key, on: :update

  # ------------------------ Callbacks

  before_create do |consumer|
    consumer.api_key = consumer.generate_api_key
  end

  # ------------------------ Instance Methods

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless Consumer.exists?(api_key: token)
    end
  end

end
