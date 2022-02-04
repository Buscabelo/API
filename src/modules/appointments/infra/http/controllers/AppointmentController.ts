import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {parseISO, format, addHours, isBefore} from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GetAllAppointmentsService from '@modules/appointments/services/GetAllAppointmentsService';
import GetAppointmentByIdService from '@modules/appointments/services/GetAppointmentByIdService';
import UpdateAppointmentService from '@modules/appointments/services/UpdateAppointmentService';

export class AppointmentController{ 
  private static INSTANCE : AppointmentController;
  
   static getInstance(): AppointmentController{
    if (!AppointmentController.INSTANCE){
      AppointmentController.INSTANCE = new AppointmentController();
    }
    return AppointmentController.INSTANCE;
  }

  async getAll(request: Request, response: Response){
    try {
      const service = container.resolve(GetAllAppointmentsService);
      const appointments = await service.execute();
     
      return response.status(200).json({
        success: true,
        appointments: appointments
      });

    }catch(err){
      return response.status(400).json({
        success: false,
        message : err.message
      });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const appoinmentService = container.resolve(GetAppointmentByIdService);
      const appointment = await appoinmentService.execute(Number(id));
    
      return response.status(200).json({
        success: true,
        appointment:{
          id:appointment?.id,
          scheduled_at: appointment?.scheduled_at,
          appointment_to: appointment?.appointment_to,
          time_done_at: appointment?.time_done_at,
          canceled_at: appointment?.canceled_at,
          provider:{
            id: appointment?.provider.id,
            name: appointment?.provider.name,
          },
          customer:{
            id: appointment?.customer.id,
            name: appointment?.customer.name,
          },
          service:{
            id: appointment?.service.id,
            name: appointment?.service.description,
            value: appointment?.service.value,
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

  async finish(request: Request, response: Response){
    try {
      const {time_done_at} = request.body;
      const { id } = request.params;
      const timeNowParsed = parseISO(format(new Date, 'yyyy-MM-dd HH:mm:ss'));
      const appointmentService = container.resolve(UpdateAppointmentService);
      const getAppointmentService = container.resolve(GetAppointmentByIdService);
      await getAppointmentService.execute(Number(id)).then((currentAppointment) => {
        if (currentAppointment?.canceled_at !== null){
          throw new Error ('Appointment is already canceled');
        }
        if (currentAppointment?.appointment_to < addHours(timeNowParsed, 1)){
          throw new Error (`It's too early to finish`);
        }
      })

      const appointment = await appointmentService.execute(Number(id), {
        time_done_at,        
      })

       return response.status(200).json({
        success: true,
        appointment: appointment
      });
  
      
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  } 
  
  async cancel(request: Request, response: Response){
    const path = request.path
    try {
      const { canceled_at } = request.body;
      const { id } = request.params;
      const appointmentService = container.resolve(UpdateAppointmentService);
      const getAppointmentService = container.resolve(GetAppointmentByIdService);
      await getAppointmentService.execute(Number(id)).then((currentAppointment) => {
        if (currentAppointment?.canceled_at !== null){
          throw new Error ('Appointment is already canceled');
        } else if (currentAppointment?.time_done_at !== null) {
          throw new Error ('Appointment is already finished');
        }
      });
  
      const appointment = await appointmentService.execute(Number(id), {
        canceled_at,
      })
       return response.status(200).json({
        success: true,
        appointment: appointment
      });

    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async update(request: Request, response: Response){
    const path = request.path
    try {
      const {canceled_at,time_done_at,} = request.body;
      const { id } = request.params;
      const timeNowParsed = parseISO(format(new Date, 'yyyy-MM-dd HH:mm:ss'));
      const appointmentService = container.resolve(GetAppointmentByIdService);
      const updateAppointmentService = container.resolve(UpdateAppointmentService); 
      const currentAppointmet = await appointmentService.execute(Number(id));
      
      if (path.includes('cancel')){
        if (currentAppointmet?.canceled_at !== null){
          throw new Error ('Appointment is already canceled');
        } else if (currentAppointmet?.time_done_at !== null) {
          throw new Error ('Appointment is already finished');
        }
    
        const appointment = await updateAppointmentService.execute(Number(id), {
          canceled_at
        })
         return response.status(200).json({
          success: true,
          appointment: appointment
        });
      } else {
        if (currentAppointmet?.canceled_at !== null){
          throw new Error ('Appointment is already canceled');
        }
        if (currentAppointmet?.appointment_to < addHours(timeNowParsed, 1)){
          throw new Error (`It's too earlier to finish`);
        }

        const appointment = updateAppointmentService.execute(Number(id), {
          time_done_at,        
        })
         return response.status(200).json({
          success: true,
          appointment: appointment
        });
      }

      
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  } 

  async create(request: Request, response: Response){
    try {
      const {
        provider, 
        customer, 
        appointment_to, 
        service, 
      } = request.body;

      const timeNowParsed = parseISO(format(new Date, 'yyyy-MM-dd'));
      const parsedDate = parseISO(appointment_to); 

      if(isBefore(parsedDate, timeNowParsed)){
        throw new Error ('The data must be later than this');
      }
      if(provider === customer){
        throw new Error ('Users must be distinct');
      }
    
      const createAppointment = container.resolve(CreateAppointmentService);
      const appointment = await createAppointment.execute({
        provider,
        customer,
        appointment_to: parsedDate,
        service,
        scheduled_at: timeNowParsed,
      })

      return response.json({
        success: true,
        appointment:{
          id:appointment?.id,
          scheduled_at: appointment?.scheduled_at,
          appointment_to: appointment?.appointment_to,
          time_done_at: appointment?.time_done_at,
          canceled_at: appointment?.canceled_at,
          provider:{
            id: appointment?.provider.id,
            name: appointment?.provider.name,
          },
          customer:{
            id: appointment?.customer.id,
            name: appointment?.customer.name,
          },
          service:{
            id: appointment?.service.id,
            name: appointment?.service.description,
            value: appointment?.service.value,
          }
        }
      });
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  } 
}
