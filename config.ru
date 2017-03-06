# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Cors do
  allow do
    origins 'localhost:3000', '127.0.0.1:3000', 'http://catstagram.ngrok.io/',
            /\Ahttp:\/\/192\.168\.0\.\d{1,3}(:\d+)?\z/
            # regular expressions can be used here

    resource '/app/assets/javascripts/maps.js',
        :methods => [:get, :post, :options, :head],
        :headers => 'x-domain-token',
        :expose  => ['code'],
        :max_age => 600
        # headers to expose
  end

  allow do
    origins '*'
    resource '/public/*', :headers => :any, :methods => :get
  end
end

run Rails.application
