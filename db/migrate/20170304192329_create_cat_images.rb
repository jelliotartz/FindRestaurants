class CreateCatImages < ActiveRecord::Migration[5.0]
  def change
    create_table :cat_images do |t|
      t.string  :resource_url

      t.timestamps
    end
  end
end
