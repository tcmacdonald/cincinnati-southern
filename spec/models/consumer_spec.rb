require 'rails_helper'

RSpec.describe Consumer, type: :model do

  it { should validate_presence_of(:api_key) }

end
