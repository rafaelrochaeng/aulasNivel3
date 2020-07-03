import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
      this.appointment = [];
    }

    public findByDate(date: Date) : Appointment | null {
      const findAppointments = this.appointments.find((appointment) => {
        isEqual(appointment.date, date);
      });

      return findAppointments || null;
    }

    public create(provider: string, date: Date): Appointment {
      const newAppointment = new Appointment(provider, date);
      this.appointments.push(newAppointment);
      return newAppointment;
    }
}

export default AppointmentsRepository;
