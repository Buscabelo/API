import {Router} from 'express';
import {ServiceController} from '../controllers/ServiceController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ImageController } from '../controllers/ImageController';
import multer from 'multer';
import uploadingConfig from '@config/upload';

const serviceRouter = Router();
const upload =  multer(uploadingConfig);
const controller = ServiceController.getInstance();
const imageController = ImageController.getInstance();

serviceRouter.get('/search', controller.filters);
serviceRouter.get('/', ensureAuthenticated, controller.getAll);
serviceRouter.get('/:id', controller.getById);
serviceRouter.post('/', ensureAuthenticated, controller.create);
serviceRouter.put('/:id', ensureAuthenticated, controller.update);
serviceRouter.delete('/:id', ensureAuthenticated, controller.remove);
serviceRouter.post('/:id/upload/', 
upload.single('image'),
imageController.UploadImage
);

export default serviceRouter;