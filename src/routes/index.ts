import {Router} from 'express';

import customerRouter from './customer.routes';
import serviceRouter from './service.routes';
import sessionRouter from './sessions.routes';
import appointmentRouter from './appointments.routes';
const routes = Router();

routes.use('/customers', customerRouter);
routes.use('/services', serviceRouter);
routes.use('/sessions', sessionRouter);
routes.use('/appointments', appointmentRouter);

export default routes;
