class WaldoController < ApplicationController

	before_action :find_or_create_session_id, only: [:show]

	def show
		# Set the timer to the session time if present
		if session[:waldo_time].present?
			@seconds = session[:waldo_time]['seconds']
			@minutes = session[:waldo_time]['minutes']
			@hours = session[:waldo_time]['hours']
		else
			@seconds = "00"
			@minutes = "00"
			@hours = "00"
		end
	end

	def victory
		@users = User.all.order(score: :asc)
		@tags = Tag.where(:session_id => session[:waldo_id])

		# Allow us to submit our score
		if hit_count(@tags, session[:waldo_id]) == 5
			session[:waldo_score_submit] = 1
		else
			session[:waldo_score_submit] = nil
		end	

		respond_to do |format|
			# Source: http://stackoverflow.com/questions/5454806/rails-3-how-to-redirect-to-in-ajax-call
			format.js { render :js => "window.location = '#{victory_path}'" }
			format.html { render :victory }
		end
	end

end