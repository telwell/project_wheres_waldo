class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
    	t.string :character
    	t.integer :x_coord
    	t.integer :y_coord

      t.timestamps null: false
    end
  end
end
