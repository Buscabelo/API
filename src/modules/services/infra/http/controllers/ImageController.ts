import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadImageManager from '@modules/services/managers/UploadImageManager';

export class ImageController {
  private static INSTANCE: ImageController;

  static getInstance(): ImageController {
    if (!ImageController.INSTANCE) {
      ImageController.INSTANCE = new ImageController();
    }
    return ImageController.INSTANCE;
  }

  async UploadImage(request: Request, response: Response) {
    try {
      const uploadImage = container.resolve(UploadImageManager)
      const { id } = request.params as any;
      const image = await uploadImage.execute({
        service: id,
        url: request.file?.filename
      })

      return response.json({
        success: true,
        image: {
          url: image.url,
          service: {
            id: image.service.id,
          }
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
