require 'rails_helper'

shared_examples_for "authorizable" do
  let(:consumer) { create(:consumer) }

  describe "GET" do

    it "requires auth token" do
      get path, headers: { 'Authorization' => "Token token=\"#{consumer.api_key}\"" }
      expect(response).to have_http_status(200)
    end

    it "returns 401 if auth token is incorrect" do
      get path, headers: { 'Authorization' => "Token token=\"12345\"" }
      expect(response).to have_http_status(401)
    end

    it "returns 401 if auth token is missing" do
      get path
      expect(response).to have_http_status(401)
    end

  end
end