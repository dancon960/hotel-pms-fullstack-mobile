import { create } from 'zustand';
import { Planta, Habitacion, Booking, Incident } from '../types';

// 1. Definimos los precios por tipo
const PRECIOS: Record<string, number> = {
  'DBL': 85,
  'SUI': 150,
  'IND': 60
};

// 2. Rack de habitaciones
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

// 3. Interfaz del Store con las nuevas funciones de Reservas
interface HotelStore {
  plantas: Planta[];
  bookings: Booking[];
  incidents: Incident[];
  selectedRoom: Habitacion | null;
  setSelectedRoom: (room: Habitacion | null) => void;
  cambiarEstado: (numero: string, nuevoEstado: Habitacion['estado']) => void;
  addIncident: (incident: Incident) => void;
  // Nuevas acciones para reservas
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
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
      status: 'checked-in',
      companions: [] 
    },
    { 
      id: '2', 
      createdAt: new Date(),
      updatedAt: new Date(),
      guestName: 'Martínez, Ana', 
      roomNumber: '204', 
      checkIn: new Date(), 
      checkOut: new Date(),
      status: 'checked-in',
      companions: [] 
    },
  ],

  // Acción: Seleccionar habitación para el modal
  setSelectedRoom: (room) => set({ selectedRoom: room }),

  // Acción: Cambiar estado de limpieza/disponibilidad
  cambiarEstado: (numero, nuevoEstado) =>
    set((state) => ({
      plantas: state.plantas.map((p) => ({
        ...p,
        habitaciones: p.habitaciones.map((h) =>
          h.numero === numero ? { ...h, estado: nuevoEstado } : h
        ),
      })),
    })),

  // Acción: Añadir incidencia técnica
  addIncident: (incident) =>
    set((state) => ({ incidents: [...state.incidents, incident] })),

  // Acción: Añadir nueva reserva
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),

  // Acción: Editar reserva existente (nombre, hab, acompañantes, etc.)
  updateBooking: (id, updated) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, ...updated, updatedAt: new Date() } : b
      ),
    })),
}));