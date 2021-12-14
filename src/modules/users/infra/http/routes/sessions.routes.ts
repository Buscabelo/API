import {Router} from 'express';
import {SessionController} from '@modules/users/infra/http/controllers/SessionController';

const sessionRouter = Router();
const controller = SessionController.getInstance();

sessionRouter.post('/', controller.create);

export default sessionRouter;