import { create } from 'zustand';
import { Planta, Habitacion, Booking, Incident } from '../types';

// 1. Definimos los precios por tipo
const PRECIOS: Record<string, number> = {
  'DBL': 85,
  'SUI': 150,
  'IND': 60
};

// 2. Rack de habitaciones (He corregido los números de la planta 3 para que sean 301, 302...)
const HOTEL_DATA: Planta[] = [
  {
    piso: 1,
    habitaciones: [
      { numero: '101', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
      { numero: '102', tipo: 'SUI', estado: 'ocupada', precio: PRECIOS['SUI'] },
      { numero: '103', tipo: 'IND', estado: 'sucia', precio: PRECIOS['IND'] },
      { numero: '104', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
    ]
  },
  {
    piso: 2,
    habitaciones: [
      { numero: '201', tipo: 'DBL', estado: 'mantenimiento', precio: PRECIOS['DBL'] },
      { numero: '202', tipo: 'DBL', estado: 'sucia', precio: PRECIOS['DBL'] },
      { numero: '203', tipo: 'SUI', estado: 'libre', precio: PRECIOS['SUI'] },
      { numero: '204', tipo: 'IND', estado: 'ocupada', precio: PRECIOS['IND'] },
    ]
  },
  {
    piso: 3,
    habitaciones: [
      { numero: '301', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
      { numero: '302', tipo: 'SUI', estado: 'libre', precio: PRECIOS['SUI'] },
      { numero: '303', tipo: 'IND', estado: 'sucia', precio: PRECIOS['IND'] },
      { numero: '304', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
    ]
  }
];

// 3. Interfaz única del Store
interface HotelStore {
  plantas: Planta[];
  bookings: Booking[];
  incidents: Incident[];
  selectedRoom: Habitacion | null; // Habitación que clicamos
  setSelectedRoom: (room: Habitacion | null) => void;
  cambiarEstado: (numero: string, nuevoEstado: Habitacion['estado']) => void;
  addIncident: (incident: Incident) => void;
}

export const useHotelStore = create<HotelStore>((set) => ({
  // Estado inicial
  plantas: HOTEL_DATA,
  selectedRoom: null,
  incidents: [],
  bookings: [
    { 
      id: '1', 
      createdAt: new Date(),
      updatedAt: new Date(),
      guestName: 'García, Daniel', 
      roomNumber: '102', 
      checkIn: new Date(), 
      checkOut: new Date(),
      status: 'checked-in' 
    },
    { 
      id: '2', 
      createdAt: new Date(),
      updatedAt: new Date(),
      guestName: 'Martínez, Ana', 
      roomNumber: '204', 
      checkIn: new Date(), 
      checkOut: new Date(),
      status: 'checked-in' 
    },
  ],

  // Acciones
  setSelectedRoom: (room) => set({ selectedRoom: room }),

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