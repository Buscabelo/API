import {Router} from 'express';
import multer from 'multer';
import uploadingConfig from '@config/upload';
import { CustomerController } from '@modules/customers/infra/http/controllers/CustomerController';
import {UserController} from '@modules/users/infra/http/controllers/UserController';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const customerRouter = Router();
const upload =  multer(uploadingConfig);
const controller = CustomerController.getInstance();
//const userController = UserController.getInstance();

customerRouter.post('/', controller.create);
customerRouter.get('/', controller.getAll);
customerRouter.get('/:id/appointments', controller.getAppointments);
// customerRouter.patch('/avatar', 
// EnsureAuthenticated,
// upload.single('avatar'),
// userController.UpdateAvatar);

export default customerRouter;