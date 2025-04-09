class ChatbotController < ApplicationController
  def index
  end

  def ask
    user_message = params[:message].downcase

    # Looking for matchings (this is a simple way, we can also find matchings with the answer and the category)
    @question = Question.all.find do |q|
      user_message.include?(q.query.downcase) ||
      q.query.downcase.include?(user_message)
    end
    if @question
      response = @question.answer
    else
      response = "Désolé, je n'ai pas la réponse à ta question. Peux-tu reformuler ou poser une question ?"
    end

    render json: { response: response }
  end
end
