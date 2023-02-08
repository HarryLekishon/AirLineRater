module Api
    module V1
        class UsersController < ApplicationController
            # skip_before_action :authenticate, only: [:create]

            def create
                user = User.create!(user_params)
                session[:user_id] = user.id
                render json: user, status: :created
            end

            def show
                user = User.find(session[:user_id])
                if user
                    render json: user
                else
                    render json: {error: "user not authorized"}, status: :unauthorized
                end
            end

            private

            def user_params
                params.permit(:email, :password)
            end
        end
    end
end