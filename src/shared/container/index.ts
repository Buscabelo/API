import {container} from 'tsyringe';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository'
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ServiceRepository from '@modules/services/infra/typeorm/repositories/ServiceRepository'
import IServiceRepository from '@modules/services/repositories/iServiceRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    CustomerRepository
);
container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
);
container.registerSingleton<IProviderRepository>(
    'ProviderRepository',
    ProviderRepository
);
container.registerSingleton<IServiceRepository>(
    'ServiceRepository',
    ServiceRepository
);
container.registerSingleton<IAppointmentRepository>(
    'AppointmentRepository',
    AppointmentRepository
);
