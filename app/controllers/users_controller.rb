class UsersController < ApplicationController


	def create
		@user = User.new( user_params )	
		@user.score = set_score_from_session
		if @user.save
			destroy_session
			redirect_to victory_path
		else
			render :victory
		end
	end


private
	

	def user_params
		params.require(:user).permit(:username)
	end


	def set_score_from_session
		temp = 0
		temp += session[:waldo_time]['seconds'].to_i
		temp += (session[:waldo_time]['minutes'] * 60).to_i
		temp += (session[:waldo_time]['hours'] * 60 * 60).to_i
		temp
	end

end
