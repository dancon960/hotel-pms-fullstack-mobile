import { create } from 'zustand';
import { Planta, Habitacion, Booking, Incident } from '../types';

// Tus datos de inventario.ts
const HOTEL_DATA: Planta[] = [
  {
    piso: 1,
    habitaciones: [
      { numero: '101', tipo: 'DBL', estado: 'libre', precio: 85 },
      { numero: '102', tipo: 'SUI', estado: 'ocupada', cliente: 'García, Daniel', precio: 150 },
      { numero: '103', tipo: 'IND', estado: 'sucia', precio: 60 },
      { numero: '104', tipo: 'DBL', estado: 'libre', precio: 85 },
    ]
  },
  {
    piso: 2,
    habitaciones: [
      { numero: '201', tipo: 'DBL', estado: 'mantenimiento', precio: 85 },
      { numero: '202', tipo: 'DBL', estado: 'sucia', precio: 85 },
      { numero: '203', tipo: 'SUI', estado: 'libre', precio: 150 },
      { numero: '204', tipo: 'IND', estado: 'ocupada', cliente: 'Martínez, Ana', precio: 60 },
    ]
  }
];

interface HotelStore {
  plantas: Planta[];
  bookings: Booking[];
  incidents: Incident[];
  
  // Tu lógica de App.tsx traída a Zustand
  cambiarEstado: (numero: string, nuevoEstado: Habitacion['estado']) => void;
  addIncident: (incident: Incident) => void;
}

export const useHotelStore = create<HotelStore>((set) => ({
  plantas: HOTEL_DATA,
  bookings: [],
  incidents: [],

  cambiarEstado: (numero, nuevoEstado) =>
    set((state) => ({
      plantas: state.plantas.map((p) => ({
        ...p,
        habitaciones: p.habitaciones.map((h) =>
          h.numero === numero ? { ...h, estado: nuevoEstado } : h
        ),
      })),
    })),

  addIncident: (incident) =>
    set((state) => ({ incidents: [...state.incidents, incident] })),
}));