import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FindAppointmentsByProviderService{
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.providerRepository.findAppointmentsByProvider(id);
   
    if (!appointments) {
      throw new Error ('no services found!');
    }

    return appointments;
  }
}
