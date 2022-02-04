import { container } from 'tsyringe';

import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository'
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import ServiceRepository from '@modules/services/infra/typeorm/repositories/ServiceRepository'
import IServiceRepository from '@modules/services/repositories/iServiceRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import ImageRepository from '@modules/services/infra/typeorm/repositories/ImageRepository';
import IImageRepository from '@modules/services/repositories/IImageRepository';

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

container.registerSingleton<IImageRepository>(
    'ImageRepository',
    ImageRepository
);
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    S3StorageProvider
);
