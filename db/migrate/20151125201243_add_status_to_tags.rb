class AddStatusToTags < ActiveRecord::Migration
  def change
  	remove_column :tags, :characters, :string
  	remove_column :tags, :character, :string
  	add_column :tags, :status, :boolean, default: false
  end
end
