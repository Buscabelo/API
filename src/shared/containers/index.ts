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
import IMailTemplateProvider from '@shared/containers/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailProvider from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import SESEmailProvider from './providers/MailProvider/implementations/SESMailProvider'
import IRatingRepository from '@modules/providers/repositories/IRatingRepository';
import RatingRepository from '@modules/providers/infra/typeorm/repositories/RatingRepository';

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
container.registerSingleton<IRatingRepository>(
    'RatingRepository',
    RatingRepository
);
container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    S3StorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    "MailTemplateProvider",
    HandlebarsMailTemplateProvider,
  );
  
  container.registerInstance<IMailProvider>(
    "MailProvider",
    container.resolve(EtherealMailProvider),
  );