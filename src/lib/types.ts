export type Appointment = {
  id: string;
  clientName: string;
  clientPhone: string;
  service: 'Manicure' | 'Pedicure' | 'Gel Nails' | 'Nail Art' | 'Manicura' | 'Pedicura' | 'Uñas de Gel' | 'Arte en Uñas';
  date: Date;
  time: string;
};
