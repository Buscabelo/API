import Provider from "@modules/providers/infra/typeorm/entities/Provider";

export default interface IServiceDTO{
  name: string;
  description: string;
  value: number;
  provider: Provider;
}