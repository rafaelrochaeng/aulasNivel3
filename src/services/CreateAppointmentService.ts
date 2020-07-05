import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository : AppointmentsRepository) {
      this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: request) : Appointment {
      const appointmentDate = startOfHour(date);

      const findAppointmentsIsSameDate = this.appointmentsRepository.findByDate(appointmentDate);

      if (findAppointmentsIsSameDate) {
        throw Error('This appointment is already booked.');
      }

      const newAppointment = this.appointmentsRepository.create({
        provider,
        date: appointmentDate,
      });
      return newAppointment;
    }
}

export default CreateAppointmentService;
