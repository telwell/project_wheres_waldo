class AddSessionIdToTags < ActiveRecord::Migration
  def change
  	add_column :tags, :session_id, :string
  	add_index :tags, :session_id
  end
end
