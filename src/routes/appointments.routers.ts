import { Router, json } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();
const appointments: Appointment[] = [];

appointmentsRouter.use(json());

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsIsSameDate = appointments.find((appointment) => isEqual(appointment.date, parsedDate));

  if (findAppointmentsIsSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });
  }

  const newAppointment = new Appointment(provider, parsedDate);

  appointments.push(newAppointment);

  return response.json(newAppointment);
});

export default appointmentsRouter;
