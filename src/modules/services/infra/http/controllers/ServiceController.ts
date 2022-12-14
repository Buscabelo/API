import { Request, Response, } from 'express';
import { container } from 'tsyringe';

import DeleteServiceManager from '@modules/services/managers/DeleteServiceManager';
import FindServiceByFilterManager from '@modules/services/managers/FindServiceByFilterManager';
import FindByProviderManager from '@modules/services/managers/FindByProviderManager';
import FindServiceByIdManager from '@modules/services/managers/FindServiceByIdManager';
import UpdateServiceManager from '@modules/services/managers/UpdateServiceManager';
import CreateServiceManager from '@modules/services/managers/CreateServiceManager';
import GetAllServicesManager from '@modules/services/managers/GetAllServicesManager';
import FindServiceTypesManager from '@modules/services/managers/FindServiceTypesManager';

export class ServiceController {
  private static INSTANCE: ServiceController;

  static getInstance(): ServiceController {
    if (!ServiceController.INSTANCE) {
      ServiceController.INSTANCE = new ServiceController();
    }
    return ServiceController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
      const serviceManager = container.resolve(FindByProviderManager);

      const services = await serviceManager.execute(request.user.id)
      return response.status(200).json({
        success: true,
        services: services?.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
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

  async getServiceTypes(request: Request, response: Response) {
    
    try {
      const serviceManager = container.resolve(FindServiceTypesManager);

      const types = await serviceManager.execute()
      return response.status(200).json({
        success: true,
        types
      });
      
    } catch (err) {
      return response.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const serviceManager = container.resolve(FindServiceByIdManager);

      const service = await serviceManager.execute(Number(id));

      return response.status(200).json({
        success: true,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
          }
        }
      });

    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async filters(request: Request, response: Response) {
    try {
      let { name, maxPrice, minPrice, serviceType } = request.query;
      const manager = container.resolve(FindServiceByFilterManager);
      const services = await manager.execute(name, maxPrice, minPrice, serviceType);

      return response.status(200).json({
        success: true,
        services: services.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider?.id,
            name: service.provider?.name,
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
      const { name, description, value, provider, type } = request.body;
      const createService = container.resolve(CreateServiceManager);
      const service = await createService.execute({
        name,
        description,
        value,
        provider,
        type
      });

      return response.status(200).json({
        success: true,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
          }
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });;
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { name, description, value, provider, type } = request.body;
      const { id } = request.params;
      const manager = container.resolve(UpdateServiceManager);
      const service = await manager.execute(Number(id), {
        name,
        description,
        value,
        provider,
        type
      });

      return response.status(200).json({
        success: true,
        service: {
          id: service?.id,
          name: service?.name,
          description: service?.description,
          value: service?.value,
          type: service?.type,
          provider: {
            id: service?.provider.id,
            name: service?.provider.name,
          }
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const manager = container.resolve(DeleteServiceManager);
      const service = await manager.execute(Number(id))

      return response.status(200).json({
        success: true,
        service: {
          id: service?.id,
          name: service?.name,
          description: service?.description,
          value: service?.value,
          type: service?.type,
          provider: {
            id: service?.provider.id,
            name: service?.provider.name,
          }
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
  async getAllServices(request: Request, response: Response){
    try {
      const manager = container.resolve(GetAllServicesManager);
      const services = await manager.execute();
      return response.status(200).json({
        success: true,
        services: services?.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
          }
        }))
      });
    } catch (err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}
