'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { appointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';

const appointmentFormSchema = z.object({
  clientName: z.string().min(2, 'Name is required'),
  clientPhone: z.string().min(10, 'A valid phone number is required'),
  service: z.enum(['Manicure', 'Pedicure', 'Gel Nails', 'Nail Art']),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date',
  }),
  time: z.string().nonempty('Time is required'),
});

export async function createAppointment(
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());

  // Manually convert date to string if it's a Date object for validation
  if (rawFormData.date instanceof Date) {
    rawFormData.date = rawFormData.date.toISOString();
  }

  const validatedFields = appointmentFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fill out all fields correctly.',
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

    return { message: 'Appointment booked successfully!', appointment: newAppointment };
  } catch (e) {
    return {
      message: 'Database Error: Failed to Create Appointment.',
    };
  }
}

export async function deleteAppointment(id: string) {
  try {
    const index = appointments.findIndex((apt) => apt.id === id);
    if (index > -1) {
      appointments.splice(index, 1);
      revalidatePath('/admin/dashboard');
      return { success: true, message: 'Appointment deleted.' };
    }
    return { success: false, message: 'Appointment not found.' };
  } catch (e) {
     return { success: false, message: 'Database Error: Failed to Delete Appointment.' };
  }
}
