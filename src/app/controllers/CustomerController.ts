import { Request, Response } from 'express';
import customerRouter from '../../routes/customer.routes';

import CustomerService from '../services/CustomerService';
import SessionService from '../services/SessionService';

class CustomerController{

  async getAll(request: Request, response: Response){
    try{
      const customerService = new CustomerService();

      const users = await customerService.find()

      return response.status(200).json({
        message: "users found!",
        data: users
      });

    }catch(err){
      return response.status(400).json({error : err.message});
    }
  }

  async create(request: Request, response: Response){
    try{
      const customerService = new CustomerService();

      const {name, email, password} =  request.body;
  
      const user = await customerService.execute({
        name,
        email,
        password 
      });
      
      return response.status(200).json({
        message: "user Created!",
        data: user
      });
    } catch (err){
      return response.status(400).json({error : err.message});
    }
  }
  async getAppointments(request: Request, response: Response){
    try {
      const { id } = request.params;
      const service = new CustomerService();
      
      const appointments = await service.findAppointmentsCustomer(id);
    
      return response.status(200).json(appointments.map(
        appointment => (
          {appointment:{
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
          }}
        )
      ));
       
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async googleSignIn(request: Request, response: Response){
    const {name, email} = request.body;
    const customerService =  new CustomerService();
    const sessionService = new SessionService();
    const currentUser = { email, password: ''};

    if(!customerService.checkEmail(email)){
      try{
         const customer = await customerService.execute({
          name,
          email,
          password: ''
        });
        currentUser.email = customer.email
  
        return response.status(200).json({
          message: "Customer Created!",
          data: customer
        });
      } catch (err){
        return response.status(400).json({error : err.message});
      }  

    }
    sessionService.execute(currentUser); 
    }

}

export default new CustomerController();