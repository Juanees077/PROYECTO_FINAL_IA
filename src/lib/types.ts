export type Appointment = {
  id: string;
  clientName: string;
  clientPhone: string;
  service: 'Manicure' | 'Pedicure' | 'Gel Nails' | 'Nail Art';
  date: Date;
  time: string;
};
