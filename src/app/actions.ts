'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { appointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';

const appointmentFormSchema = z.object({
  clientName: z.string().min(2, 'Se requiere un nombre'),
  clientPhone: z.string().min(10, 'Se requiere un número de teléfono válido'),
  service: z.enum(['Manicure', 'Pedicure', 'Gel Nails', 'Nail Art']),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  }),
  time: z.string().nonempty('Se requiere una hora'),
});

export async function createAppointment(
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = appointmentFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor, completa todos los campos correctamente.',
    };
  }

  const { clientName, clientPhone, service, date, time } = validatedFields.data;

  try {
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      clientName,
      clientPhone,
      service,
      date: new Date(date),
      time,
    };

    // Add to the beginning of the array to show up first
    appointments.unshift(newAppointment);

    revalidatePath('/');
    revalidatePath('/admin/dashboard');

    return { message: '¡Cita agendada con éxito!', appointment: newAppointment };
  } catch (e) {
    return {
      message: 'Error de la base de datos: No se pudo crear la cita.',
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    const index = appointments.findIndex((apt) => apt.id === id);
    if (index > -1) {
      appointments.splice(index, 1);
      revalidatePath('/admin/dashboard');
      return { success: true, message: 'Cita eliminada.' };
    }
    return { success: false, message: 'Cita no encontrada.' };
  } catch (e) {
     return { success: false, message: 'Error de la base de datos: No se pudo eliminar la cita.' };
  }
}
