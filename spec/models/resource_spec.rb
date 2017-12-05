require 'rails_helper'

RSpec.describe Resource, type: :model do

  it { should validate_presence_of(:title) }
  it_behaves_like 'composeable'
  it_behaves_like 'templateable'

end
