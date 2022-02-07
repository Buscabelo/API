
import { getConnection } from "typeorm";
import { createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

function createUser(type: string) {
  /*
  id             | uuid              |           | not null | uuid_generate_v4() | plain    |             |              |
  name           | character varying |           | not null |                    | extended |             |              |
  email          | character varying |           | not null |                    | extended |             |              |
  password       | character varying |           | not null |                    | extended |             |              |
  avatar         | character varying |           |          |                    | extended |             |              |
  description    | character varying |           |          |                    | extended |             |              |
  address        | character varying |           |          |                    | extended |             |              |
  rating_average | double precision  |           |          |                    | plain    |             |              |
  type           | character varying |           | not null |                    | extended |             |              |
  */

  const uuid = uuidv4()
  const entitie_name = `${type} ${uuid}`;

  let entitie = {
    id: uuid,
    name: entitie_name,
    type: type,
    email: `${entitie_name.replace(/\s/g, "")}@email.com`,
    password: uuid,
    avatar: null,
    description: `O ${entitie_name.toLowerCase()} foi gerado automaticamente.`,
    address: null,
    rating_average: parseFloat("0.0"),
  }

  return entitie
}
function createService(provider_id: string, service_id: number) {
  /*
  id          | integer           |           | not null | nextval('service_id_seq'::regclass) | plain    |             |              |
  name        | character varying |           | not null |                                     | extended |             |              |
  description | character varying |           | not null |                                     | extended |             |              |
  value       | double precision  |           | not null |                                     | plain    |             |              |
  type        | service_type_enum |           | not null | ''::service_type_enum               | plain    |             |              |
  providerId  | uuid              |           |          |                                     | plain    |             |              |
  */
  const id = service_id

  const name = `Corte ${id}`

  let entitie = {
    id,
    name,
    description: `O ${name.toLowerCase()} foi gerado automaticamente.`,
    value: 100.00,
    type: "",
    providerId: provider_id
  }
  return entitie
}
function createAppointment(provider_id: string, customer_id: string, service_id: number, too_late = false, appointment_id: number) {
  
  /*
  id             | integer                     |           | not null | nextval('appointment_id_seq'::regclass) | plain   |             |
  scheduled_at   | timestamp without time zone |           | not null |                                         | plain   |             |
  appointment_to | timestamp without time zone |           | not null |                                         | plain   |             |
  time_done_at   | timestamp without time zone |           |          |                                         | plain   |             |
  canceled_at    | timestamp without time zone |           |          |                                         | plain   |             |
  providerId     | uuid                        |           |          |                                         | plain   |             |
  customerId     | uuid                        |           |          |                                         | plain   |             |
  serviceId      | integer                     |           |          |                                         | plain   |             |
  ratingId       | uuid                        |           |          |                                         | plain   |             |
  */

  const id = appointment_id
  const date = new Date()
  const scheduled_at = too_late ? new Date(date.setDate(date.getDate() - 2)) : date
  const appointment_to = too_late ? date : new Date(date.setDate(date.getDate() + 2))
  
  let entitie = {
    id,
    scheduled_at,
    appointment_to,
    time_done_at: null,
    canceled_at: null,
    providerId: provider_id,
    customerId: customer_id,
    serviceId: service_id,
    ratingId: null
  }

  return entitie
}


async function init() {
  
  await createConnection({
    name: "seed",
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "buscabelo",
    synchronize: true,
    logging: true,
    entities: [
        "../modules/**/infra/typeorm/entities/*.ts"
    ]
  }).then(() => console.log('Successfully connected with seed database !!'));

  let entities: any = {"Estabelecimento": [], "Consumidor": [], "Service": [], "Appointment": []}
  
  for (let i = 0; i < 10; i++) {
    let provider = createUser("Customer")
    let customer = createUser("Provider")
    let service = createService(provider.id, i)
    const is_appointment_too_late = i%2 == 0 ? true : false
    let appointment = createAppointment(provider.id, customer.id, service.id, is_appointment_too_late, i + 1)
    entities["Estabelecimento"].push(provider)
    entities["Consumidor"].push(customer)
    entities["Service"].push(service)
    entities["Appointment"].push(appointment)
  
  }

  const conn = getConnection("seed")

  await conn.createQueryBuilder().delete().from("appointment").execute()
  await conn.createQueryBuilder().delete().from("service").execute()
  await conn.createQueryBuilder().delete().from("user").execute()
  await conn.createQueryBuilder().delete().from("image").execute()
  await conn.createQueryBuilder().delete().from("rating").execute()
  
  const user_insert_cursor = conn.createQueryBuilder().insert().into("user").values([...entities.Estabelecimento, ...entities.Consumidor])
  const service_insert_cursor = conn.createQueryBuilder().insert().into("service").values(entities.Service)
  const appointment_insert_cursor = conn.createQueryBuilder().insert().into("appointment").values(entities.Appointment)
  
  await user_insert_cursor.execute()
  await service_insert_cursor.execute()
  await appointment_insert_cursor.execute()
  
}

try {
  (async ()=> {
    console.log("Starting database seeding...");
    await init(); 
    console.log("Database seeding completed!");
  })()
} catch (err) {
  console.log("Error during database seeding:", {err});
}

