import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import Service from "@modules/services/infra/typeorm/entities/Service";
import IUserDTO from "@modules/users/dtos/IUserDTO";
import Provider from "../infra/typeorm/entities/Provider";

export default interface IProviderRepository{
  create(data: IUserDTO):Promise<Provider>;
  find():Promise<Provider[] | undefined>;
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  filterByName(name: any): Promise<Provider[] | undefined>;
}