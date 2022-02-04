import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export class UserController {
  private static INSTANCE: UserController;

  static getInstance(): UserController {
    if (!UserController.INSTANCE) {
      UserController.INSTANCE = new UserController();
    }
    return UserController.INSTANCE;
  }

  async UpdateAvatar(request: Request, response: Response) {
    try {
      const updateAvatar = container.resolve(UpdateAvatarService);
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file!.filename,
      });

      return response.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          type: user.type,
          email: user.email,
          avatar: user.avatar
        }
      });
    }
    catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
