class TagsController < ApplicationController


	def create
		@tag = Tag.new( tag_params )
		@tag.session_id = find_or_create_session_id
		respond_to do |format|
			if @tag.save
				format.js { render :create_success }
			else
				format.js { head :none }
			end
		end
	end

	def show_all_tags
		session_id = find_or_create_session_id
		@tags = Tag.where(:session_id => session_id)
		respond_to do |format|
			format.json { render json: {tags: @tags, hit_count: hit_count(@tags, session_id)} }
		end
	end

private

	def tag_params
		params.require( :tag ).permit(:x_coord, :y_coord, :status)
	end

end