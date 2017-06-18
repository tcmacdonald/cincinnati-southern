require 'rails_helper'

RSpec.describe "Consumers", type: :request do

  let(:consumer) {
    create(:consumer)
  }

  describe "GET /consumers" do

    it "requires auth token" do
      get consumers_path, headers: { 'Authorization' => "Token token=\"#{consumer.api_key}\"" }
      expect(response).to have_http_status(200)
    end

    it "returns 401 if auth token is incorrect" do
      get consumers_path, headers: { 'Authorization' => "Token token=\"12345\"" }
      expect(response).to have_http_status(401)
    end

    it "returns 401 if auth token is missing" do
      get consumers_path
      expect(response).to have_http_status(401)
    end

  end
end
