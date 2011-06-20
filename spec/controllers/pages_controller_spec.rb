require 'spec_helper'

describe PagesController do

  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end
  end

  describe "GET 'verkoop'" do
    it "should be successful" do
      get 'verkoop'
      response.should be_success
    end
  end

  describe "GET 'productie'" do
    it "should be successful" do
      get 'productie'
      response.should be_success
    end
  end

end
