'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { createAppointment } from '@/app/actions';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const appointmentSchema = z.object({
  clientName: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  clientPhone: z.string().min(10, {
    message: 'Por favor, introduce un número de teléfono válido.',
  }),
  service: z.enum(['Manicure', 'Pedicure', 'Gel Nails', 'Nail Art'], {
    required_error: 'Por favor, selecciona un servicio.',
  }),
  date: z.date({
    required_error: 'Se requiere una fecha para la cita.',
  }),
  time: z.string({
    required_error: 'Por favor, selecciona un horario.',
  }),
});

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const [state, formAction] = useFormState(createAppointment, null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      if (state.errors) {
        toast({
          title: '¡Ups!',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: '¡Éxito!',
          description: state.message,
        });
        form.reset();
      }
    }
  }, [state, toast, form]);

  const { isSubmitting } = form.formState;
  
  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  function handleFormAction(formData: FormData) {
    const date = form.getValues('date');
    if (date) {
      formData.set('date', date.toISOString());
    }
    formAction(formData);
  }

  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white px-4">
        {heroImage && 
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        }
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline mb-4 tracking-wider">
            Elegancia en Tus Manos
          </h1>
          <p className="text-lg md:text-xl font-body mb-8">
            Disfruta del mejor cuidado de uñas en un ambiente sereno y hermoso.
          </p>
          <Button size="lg" asChild>
            <a href="#book-now">Agenda Tu Cita</a>
          </Button>
        </div>
      </section>

      <section id="book-now" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-2">
              Agenda una Visita
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Elige tu servicio y encuentra un horario que te convenga.
            </p>
            <Form {...form}>
              <form action={handleFormAction} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu Teléfono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un servicio de uñas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manicure">Manicura</SelectItem>
                          <SelectItem value="Pedicure">Pedicura</SelectItem>
                          <SelectItem value="Gel Nails">Uñas de Gel</SelectItem>
                          <SelectItem value="Nail Art">Arte en Uñas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP', { locale: es })
                                ) : (
                                  <span>Elige una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date('1900-01-01')
                              }
                              initialFocus
                              locale={es}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una hora" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimes.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Agendar Cita
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
