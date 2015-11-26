class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

	def find_or_create_session_id
		if(!session[:waldo_id])
			session[:waldo_id] = generate_session
		end
		session[:waldo_id]
	end

	# Source: http://stackoverflow.com/questions/88311/how-best-to-generate-a-random-string-in-ruby
  def generate_session
		(0...50).map { ('a'..'z').to_a[rand(26)] }.join
	end

	# This function will get passed an ActiveRecord Relation and will determine the 
	# number of tags with :status => true (i.e. where a character was found).
	def hit_count(tag_relation, session_id)
		Tag.where(:session_id => session_id).where(:status => true).count
	end

	def destroy_session
		session[:waldo_id] = nil
		session[:waldo_time] = nil
		session[:waldo_score_submit] = nil
	end

end
