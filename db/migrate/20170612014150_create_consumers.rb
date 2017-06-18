class CreateConsumers < ActiveRecord::Migration[5.1]
  def change
    create_table :consumers do |t|
      t.string :url
      t.string :api_key

      t.timestamps
    end
  end
end
