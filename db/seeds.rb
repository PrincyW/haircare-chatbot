# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'json'

# Path to JSON file
json_file_path = Rails.root.join('db', 'data', 'faq_haircare.json')

# Read and parse JSON file
questions_data = JSON.parse(File.read(json_file_path))

# Browse JSON file
puts "Creating questions, answers and categories..."
questions_data.each do |item|
  Question.create!(
    query: item['query'],
    answer: item['answer'],
    category: item['category']
  )
end
puts "Done! #{Question.count} were added in the database."
