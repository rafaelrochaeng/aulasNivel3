// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

/* interface CreateAppointmentDTO {
    provider: string,
    date: Date
} */

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /* private appointments: Appointment[];

    constructor() {
      this.appointments = [];
    }

    public all() : Appointment[] {
      return this.appointments;
    } */

  public async findByDate(date: Date) : Promise<Appointment | null> {
    // const findAppointments = this.appointments.find((appointment) => isEqual(appointment.date, date));

    const findAppointments = await this.findOne({
      where: { date },
    });
    return findAppointments || null;
  }

  /* public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const newAppointment = new Appointment({ provider, date });
    this.appointments.push(newAppointment);
    return newAppointment;
  } */
}

export default AppointmentsRepository;
