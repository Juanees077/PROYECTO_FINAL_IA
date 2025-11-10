'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Appointment } from '@/lib/types';
import { deleteAppointment } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast();
  const appointment = row.original as Appointment;

  const handleDelete = async () => {
    const result = await deleteAppointment(appointment.id);
    if (result?.success) {
      toast({
        title: 'Éxito',
        description: result.message,
      });
      // The page will be revalidated by the server action
      // For immediate client-side update without full reload, state management is needed
      // in the parent component, which we will achieve with a page refresh for simplicity.
      window.location.reload();
    } else {
      toast({
        title: 'Error',
        description: result?.message || 'No se pudo eliminar la cita.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(appointment.clientPhone)}>
          Copiar Teléfono
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'clientName',
    header: 'Cliente',
  },
  {
    accessorKey: 'service',
    header: 'Servicio',
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return <div>{format(date, 'PPP', { locale: es })}</div>;
    },
  },
  {
    accessorKey: 'time',
    header: 'Hora',
  },
   {
    accessorKey: 'clientPhone',
    header: 'Teléfono',
  },
  {
    id: 'actions',
    cell: ActionCell,
  },
];
