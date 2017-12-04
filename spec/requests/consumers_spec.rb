require 'rails_helper'

RSpec.describe "Consumers", type: :request do

  it_behaves_like "authorizable" do
    let(:path) { consumers_path }
  end

end
