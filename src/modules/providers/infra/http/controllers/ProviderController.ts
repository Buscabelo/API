import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProviderService from '@modules/providers/services/CreateProviderService';
import FilterByNameService from '@modules/providers/services/FilterByNameService';
import FindAppointmentsByProviderService from '@modules/providers/services/FindAppointmentsByProviderService';
import FindProviderByIdService from '@modules/providers/services/FindProviderByIdService';
import FindServicesByProviderService from '@modules/providers/services/FindServicesByProviderService';
import GetAllProvidersService from '@modules/providers/services/GetAllProvidersService';
import UpdateRatingAverageService from '@modules/providers/services/UpdateRatingAverageService';
import GetTop5ProvidersService from '@modules/providers/services/GetTop5ProvidersService';

export class ProviderController {
  private static INSTANCE: ProviderController;

  static getInstance(): ProviderController {
    if (!ProviderController.INSTANCE) {
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
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        }))
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
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        }))
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
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average,
          avatar: provider.avatar
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
            id: service.provider.id,
            name: service.provider.name,
            rating: service.provider.rating_average
          },
          images: service.images.map(image => ({
            url: image.url,
          }))
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
            avatar: appointment?.customer.avatar,
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
      const { name, email, password, description, address, latitude, longitude } = request.body;
      const provider = await service.execute({
        name,
        email,
        password,
        description,
        address,
        latitude,
        longitude,
      });

      return response.status(200).json({
        success: true,
        provider: {
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average,
          latitude: provider.latitude,
          longitude: provider.longitude,
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async updateRating(request: Request, response: Response){
    const {rating_number , provider} = request.body;
    const service = container.resolve(UpdateRatingAverageService);
    try {
      const updatedProvider = await service.execute({
        rating_number,
        provider,
      })
      return response.status(200).json({
        success: true,
        provider: {
          name: updatedProvider.name,
          address: updatedProvider.address,
          description: updatedProvider.description,
          email: updatedProvider.email,
          rating: updatedProvider.rating_average
        }
      });
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getTop5(request: Request, response: Response) {

    const service = container.resolve(GetTop5ProvidersService);
    
    try {
      const providers = await service.execute()
      .then((_providers: any[]) => {

        return _providers.map((provider: any) => ({ 
          name: provider.name,
          id: provider.id,
          rating_number: provider.avg,
          email: provider.email,
          avatar: provider.avatar,
        }))
      })
      
      return response.status(200).json({
        success: true,
        providers,
      });
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }

  }
}
