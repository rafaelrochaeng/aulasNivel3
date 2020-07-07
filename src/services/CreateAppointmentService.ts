import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import appointmentsRouter from '../routes/appointments.routers';
import AppError from '../errors/AppError';

interface request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
  /* private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository : AppointmentsRepository) {
      this.appointmentsRepository = appointmentsRepository;
    } */

  public async execute({ provider_id, date }: request) : Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentsIsSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentsIsSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const newAppointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);
    return newAppointment;
  }
}

export default CreateAppointmentService;
