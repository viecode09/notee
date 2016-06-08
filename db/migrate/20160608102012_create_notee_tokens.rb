class CreateNoteeTokens < ActiveRecord::Migration
  def change
    create_table :notee_tokens do |t|
      t.string :api_key
      t.datetime :expires_at

      t.timestamps null: false
    end
  end
end
