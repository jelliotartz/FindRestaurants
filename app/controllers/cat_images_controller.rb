# cat images controller as left at time of abandoning instagram API

# puts response.body, response.code, response.message, response.headers.inspect

# Or wrap things up in your own class
class CatImagesController < ApplicationController
  # include HTTParty
  # base_uri 'api.instagram.com'

  # def initialize(token)
  #   @token = token
  # end

  def show
    @code = params[:code]
    puts '********************'
    puts @code
    puts '********************'

    response = HTTParty.post("https://api.instagram.com/oauth/access_token",
      :query => {
        client_id: '064f3d3936174f4397539e0d5953f9aa',
        client_secret: '41459d9ca27e40829d4e3900d5959a0e',
        grant_type: 'authorization_code',
        redirect_uri: 'http://catstagram.ngrok.io/callback',
        code: @code
      },
      :headers => {
        'Content-Type' => 'text/html'
      }
    )

    puts response

    redirect_to :pages_home
  end

  # def questions
  #   self.class.get("/2.2/questions", @options)
  # end

  # def users
  #   self.class.get("/2.2/users", @options)
  # end
end

# cat_images = CatImagesController.new(code)
# puts cat_images.show
# puts stack_exchange.questions
# puts stack_exchange.users