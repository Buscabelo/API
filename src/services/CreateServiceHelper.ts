import { request } from 'express';
import {getRepository} from 'typeorm'
import Customer from '../app/models/Customer';
import Provider from '../app/models/Provider';
import Service from '../app/models/Service';
import {Type} from '../app/models/Service';

interface Request{
  name: string;
  description: string;
  value: number;
  provider: Provider;
}
export default class CreateServiceHelper{
  public async execute({name, description, value, provider}:Request): Promise<Service> {
    const serviceRepository = getRepository(Service);
    const customerRepository = getRepository(Customer);

    const checkIsCustomer =  await customerRepository.findOne({
      where: {id:provider},
    });

    if(checkIsCustomer){
      throw new Error ('User must be a provider');
    }

    const service = serviceRepository.create({
      name,
      description,
      value,
      provider,
    });

    await serviceRepository.save(service);

    return service;
  }
}