class Resource < ApplicationRecord

  # ------------------------ Concerns

  include Templateable

  # ------------------------ Validations

  validates_presence_of :title

end
