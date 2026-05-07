import { z } from 'zod';

// --- ESTRUCTURA BASE ---
export interface BaseHotelItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- 1. RESERVAS ---
// Unificamos tu lógica web con la base obligatoria
export interface Booking extends BaseHotelItem {
  roomNumber: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
}

// --- 2. HABITACIONES (Tu lógica de Plantas) ---
export interface Habitacion {
  numero: string;
  tipo: string; // Aquí puedes usar string o 'DBL' | 'SUI' | 'IND' como en tu web
  estado: 'libre' | 'ocupada' | 'sucia' | 'mantenimiento';
  precio: number;
  cliente?: string;
}

export interface Planta {
  piso: number;
  habitaciones: Habitacion[];
}

// --- 3. INCIDENCIAS ---
export interface Incident extends BaseHotelItem {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  roomNumber: string;
}

// --- UTILIDADES Y VALIDACIÓN ---

// El tipo de unión que exige el ejercicio
export type AnyHotelItem = Booking | Incident; // Habitacion y Planta suelen ir por libre en el Store

// Type Guards (Para la nota)
export function isBooking(item: AnyHotelItem): item is Booking {
  return (item as Booking).guestName !== undefined;
}

export function isIncident(item: AnyHotelItem): item is Incident {
  return (item as Incident).description !== undefined;
}

// Esquema Zod para Incidencias
export const incidentSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  roomNumber: z.string().min(1, 'Debes asignar una habitación'),
  priority: z.enum(['low', 'medium', 'high']),
  description: z.string().min(5, 'Describe un poco mejor el problema'),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;