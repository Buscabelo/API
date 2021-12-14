import {Router} from 'express';

import customerRouter from '@modules/customers/infra/http/routes/customer.routes';
import providerRouter from '@modules/providers/infra/http/routes/provider.routes';
import serviceRouter from '@modules/services/infra/http/routes/service.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
const routes = Router();

routes.use('/v1/customers', customerRouter);
routes.use('/v1/providers', providerRouter);
routes.use('/v1/services', serviceRouter);
routes.use('/v1/sessions', sessionRouter);
routes.use('/v1/appointments', appointmentRouter);

export default routes;
