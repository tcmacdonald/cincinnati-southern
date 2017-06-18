class ConsumersController < ApplicationController
  before_action :set_consumer, only: [:show, :update, :destroy]

  # GET /consumers
  def index
    @consumers = Consumer.all

    render json: @consumers
  end

  # GET /consumers/1
  def show
    render json: @consumer
  end

  # POST /consumers
  def create
    @consumer = Consumer.new(consumer_params)

    if @consumer.save
      render json: @consumer, status: :created, location: @consumer
    else
      render json: @consumer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /consumers/1
  def update
    if @consumer.update(consumer_params)
      render json: @consumer
    else
      render json: @consumer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /consumers/1
  def destroy
    @consumer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_consumer
      @consumer = Consumer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def consumer_params
      params.require(:consumer).permit(:url, :api_key)
    end
end
