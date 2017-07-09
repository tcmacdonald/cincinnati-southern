class Resource < ApplicationRecord

  # ------------------------ Validations

  validates_presence_of :title

  # ------------------------ Attributes

  serialize :blocks

end
