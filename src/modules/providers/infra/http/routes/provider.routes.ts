import {Router} from 'express';
import multer from 'multer';
import {UserController} from '@modules/users/infra/http/controllers/UserController';
import uploadingConfig from '@config/upload';
import {ProviderController} from '../controllers/ProviderController';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRouter = Router();
const upload =  multer(uploadingConfig);
const controller = ProviderController.getInstance();
const userController = UserController.getInstance();

providerRouter.get('/search', controller.filterName);
providerRouter.get('/:id/services',controller.getServices);
providerRouter.get('/:id/appointments', controller.getAppointments);
providerRouter.get('/:id', controller.getById);
providerRouter.get('/', controller.getAll);
providerRouter.post('/', controller.create);
providerRouter.patch('/avatar',
EnsureAuthenticated,
upload.single('avatar'),
userController.UpdateAvatar);

export default providerRouter;