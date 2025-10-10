import type { Appointment } from './types';

// In a real application, this would come from a database.
// For this prototype, we use an in-memory array.
export const appointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Jane Doe',
    clientPhone: '123-456-7890',
    service: 'Gel Nails',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '10:00',
  },
  {
    id: '2',
    clientName: 'Emily Smith',
    clientPhone: '098-765-4321',
    service: 'Manicure',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '14:00',
  },
  {
    id: '3',
    clientName: 'Olivia Johnson',
    clientPhone: '555-555-5555',
    service: 'Pedicure',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '11:00',
  },
];
