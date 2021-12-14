import {Router} from 'express';

import {AppointmentController} from '@modules/appointments/infra/http/controllers/AppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();
const controller = AppointmentController.getInstance();

appointmentRouter.post('/', ensureAuthenticated, controller.create);
appointmentRouter.get('/', ensureAuthenticated, controller.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, controller.getById);
appointmentRouter.patch('/cancel/:id', ensureAuthenticated, controller.update);
appointmentRouter.patch('/finish/:id', ensureAuthenticated, controller.update);
export default appointmentRouter;