class CreateResources < ActiveRecord::Migration[5.1]
  def change
    create_table :resources do |t|
      t.string :title
      t.string :template_filename
      t.text :properties
      t.boolean :active
      t.timestamps
    end
  end
end
