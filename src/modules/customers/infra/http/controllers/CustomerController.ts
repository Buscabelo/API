import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import GetAllCustomersService from '@modules/customers/services/GetAllCustomersService';
import FindAppointmentsByCustomerService from '@modules/customers/services/FindAppointmentsByCustomerService';

export class CustomerController {
  private static INSTANCE: CustomerController;

  static getInstance(): CustomerController {
    if (!CustomerController.INSTANCE) {
      CustomerController.INSTANCE = new CustomerController();
    }
    return CustomerController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
      const customerService = container.resolve(GetAllCustomersService);
      const customers = await customerService.execute()

      return response.status(200).json({
        success: true,
        customers: customers?.map(customer => ({
          id: customer?.id,
          name: customer?.name,
          email: customer?.email,
          avatar: customer?.avatar
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
      const customerService = container.resolve(CreateCustomerService);
      const { name, email, password } = request.body;
      const customer = await customerService.execute({
        name,
        email,
        password
      });

      return response.status(200).json({
        success: true,
        customer: {
          id: customer?.id,
          name: customer?.name,
          email: customer?.email,
          avatar: customer?.avatar
        }
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
      const customerService = container.resolve(FindAppointmentsByCustomerService);
      const appointments = await customerService.execute(id);

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
            avatar: appointment?.customer.avatar
          },
          service: {
            id: appointment?.service.id,
            name: appointment?.service.name,
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
}
