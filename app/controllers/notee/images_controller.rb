
require_dependency "notee/application_controller"

module Notee
  class ImagesController < ApplicationController

    def index
      @images = Image.all.order(updated_at: :desc)
      render json: { status: 'success', images: @images}
    end

    def show
      @image = Image.find_by(id: params[:id]) if params[:id]
      @image = Image.find_by(content: params[:name]) if params[:name] && !@image
      respond_to do |format|
        if @image
          format.json { render json: @image, status: 200 }
        else
          format.json { render json: @image.errors, status: :unprocessable_entity }
        end
      end
    end

    def create
      @image = Image.new
      @image.file = params[:image]
      respond_to do |format|
        if @image.save
          format.json { render json: @image, status: 200 }
        else
          format.json { render json: @image.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      return unless @del_img = Image.find_by(content: params[:name])

      respond_to do |format|
        if @del_img.destroy
          format.json { render json: @del_img, status: 200 }
        else
          format.json { render json: @del_img.errors, status: :internal_server_error }
        end
      end
    end

    private

    def image_params
      params.require(:image).permit(:title, :content, :slug, :status, :image_id, :thumbnail_id, :published_at, :seo_keyword, :seo_description)
    end

  end
end
