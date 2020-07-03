import { Router, json } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.use(json());

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsIsSameDate = appointmentRepository.findByDate(parsedDate);
  if (findAppointmentsIsSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });
  }

  const newAppointment = appointmentRepository.create(provider, parsedDate);

  return response.json(newAppointment);
});

export default appointmentsRouter;
