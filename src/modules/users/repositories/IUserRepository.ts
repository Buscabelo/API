import User from "../infra/typeorm/entities/User";

export default interface IUserRepository {
  findByEmail(email:string):Promise<User | undefined>;
  findById(id:string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}