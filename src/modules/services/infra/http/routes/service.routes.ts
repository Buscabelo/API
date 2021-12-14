import {Router} from 'express';

import {ServiceController} from '../controllers/ServiceController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const serviceRouter = Router();
const controller = ServiceController.getInstance();

serviceRouter.get('/search', controller.filterName);
serviceRouter.get('/', ensureAuthenticated, controller.getAll);
serviceRouter.get('/:id', controller.getById);
serviceRouter.post('/', ensureAuthenticated, controller.create);
serviceRouter.put('/:id', ensureAuthenticated, controller.update);
serviceRouter.delete('/:id', ensureAuthenticated, controller.remove);

export default serviceRouter;