class PagesController < ApplicationController
  def home
    @title = "Home"
  end

  def verkoop
    @title = "Verkoop"
  end

  def productie
    @title = "Productie"
  end
  
  def administratie
    @title = "Administratie"
  end

end
