import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SessionService from '@modules/users/services/SessionService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import GoogleAuthService from '@modules/customers/services/GoogleAuth';

export class SessionController {
  private static INSTANCE : SessionController;
 
  static getInstance(): SessionController{
    if (!SessionController.INSTANCE){
      SessionController.INSTANCE = new SessionController();
    }
    return SessionController.INSTANCE;
  }

  
  async create(request: Request, response: Response) {
    try {
      const sessionService = container.resolve(SessionService);
      const { email, password } = request.body;
      const { user, token } = await sessionService.execute({
        email,
        password
      });

      return response.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async googleSignIn(request: Request, response: Response){
    const {name, email} = request.body;
    const findCustomerService = container.resolve(GoogleAuthService);
    const createCustomerSerivce = container.resolve(CreateCustomerService);
    const sessionService = container.resolve(SessionService);
    const currentUser = { email, password: ''};
    
    if(! await findCustomerService.execute(email)){
      try{
         const customer = await createCustomerSerivce.execute({
          name,
          email,
          password: ''
        });
        currentUser.email = customer.email
        const {user, token} = await sessionService.execute(currentUser);
        return response.status(200).json({success:true,user, token}); 
      } catch (err){
        
        return response.status(400).json({
          success:false,
          error : err.message});
      }  

    }
    try{
      const {user, token} = await sessionService.execute(currentUser);
      return response.status(200).json({success:true,user, token}); 
    }catch(err){
      console.log(err);
      return response.status(400).json({
        success:false,
        error : err.message});
    }
    
    }
    
  }


