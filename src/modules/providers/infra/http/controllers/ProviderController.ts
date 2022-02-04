import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProviderService from '@modules/providers/services/CreateProviderService';
import FilterByNameService from '@modules/providers/services/FilterByNameService';
import FindAppointmentsByProviderService from '@modules/providers/services/FindAppointmentsByProviderService';
import FindProviderByIdService from '@modules/providers/services/FindProviderByIdService';
import FindServicesByProviderService from '@modules/providers/services/FindServicesByProviderService';
import GetAllProvidersService from '@modules/providers/services/GetAllProvidersService';

export class ProviderController {
  private static INSTANCE : ProviderController;
  
   static getInstance(): ProviderController{
    if (!ProviderController.INSTANCE){
      ProviderController.INSTANCE = new ProviderController();
    }
    return ProviderController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
      const providerService = container.resolve(GetAllProvidersService);
      const providers = await providerService.execute()

      return response.status(200).json({
        success: true,
        providers: providers?.map(provider => ({
          id: provider.id,
          type:'provider',
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        })
        )
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async filterName(request: Request, response: Response) {
    try {
      const name = request.query['name'];
      const providerService = container.resolve(FilterByNameService);
      const providers = await providerService.execute(name);

      return response.status(200).json({
        success: true,
        providers: providers?.map(provider => ({
          type: 'provider',
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        })
        )
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const providerService = container.resolve(FindProviderByIdService);

      const provider = await providerService.execute(id);

      return response.status(200).json({
        success: true,
        provider: {
          type:'provider',
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getServices(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const providerService = container.resolve(FindServicesByProviderService);
      const services = await providerService.execute(id);

      return response.status(200).json({
        success: true,
        services: services.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            name: service.provider.name,
            address: service.provider.address,
            description: service.provider.description,
            email: service.provider.email,
            rating: service.provider.rating_average
          }
        }))
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getAppointments(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const service = container.resolve(FindAppointmentsByProviderService);
      const appointments = await service.execute(id);

      return response.status(200).json({
        success: true,
        appointments: appointments.map(appointment => ({
          id: appointment?.id,
          scheduled_at: appointment?.scheduled_at,
          appointment_to: appointment?.appointment_to,
          time_done_at: appointment?.time_done_at,
          canceled_at: appointment?.canceled_at,
          provider: {
            id: appointment?.provider.id,
            name: appointment?.provider.name,
          },
          customer: {
            id: appointment?.customer.id,
            name: appointment?.customer.name,
          },
          service: {
            id: appointment?.service.id,
            name: appointment?.service.description,
            value: appointment?.service.value,
          }
        }))
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const service = container.resolve(CreateProviderService);
      const { name, email, password } = request.body;
      const provider = await service.execute({
        name,
        email,
        password
      });

      return response.status(200).json({
        success: true,
        provider: {
          type:'provider',
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

 