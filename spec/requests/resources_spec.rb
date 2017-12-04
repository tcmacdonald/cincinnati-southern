require 'rails_helper'

RSpec.describe "Resources", type: :request do

  it_behaves_like "authorizable" do
    let(:path) { resources_path }
  end

end
