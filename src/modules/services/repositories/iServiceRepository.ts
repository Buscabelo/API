import IServiceDTO from "../dtos/IServiceDTO";
import Service from "../infra/typeorm/entities/Service";

export default interface IServiceRepository{
  findByProvider(provider:string): Promise<Service [] | undefined>;
  findById(id:number): Promise<Service | undefined>;
  filterByArguments(name: string | null, maxPrice: number | null, minPrice: number | null, serviceType: string | null): Promise<Service[] | undefined>;
  filterByName(name: any): Promise<Service[] | undefined>;
  create(data: IServiceDTO): Promise<Service>;
  update(id: number, data: IServiceDTO): Promise<Service | undefined>;
  delete(id: number): Promise<Service | undefined>;
}
