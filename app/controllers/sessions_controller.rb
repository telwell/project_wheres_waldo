class SessionsController < ApplicationController


	def destroy
		Tag.where(:session_id => session[:waldo_id]).destroy_all
		session[:waldo_id] = nil
		session[:waldo_time] = nil
		redirect_to root_path
	end


	def save_time
		# Save our time in the session every second
		session[:waldo_time] = {}
		session[:waldo_time][:seconds] = params[:seconds]
		session[:waldo_time][:minutes] = params[:minutes]
		session[:waldo_time][:hours] = params[:hours]
		render :nothing => true, :status => 200
	end


end