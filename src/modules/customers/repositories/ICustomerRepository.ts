import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IUserDTO  from "@modules/users/dtos/IUserDTO";

export default interface ICustomerRepository{
  create(userDTO:IUserDTO): Promise<Customer>;
  find(): Promise<Customer[] | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findAppointmentsByCustomer(id: string): Promise<Appointment []| undefined>;
}