import { create } from 'zustand';
import { Planta, Habitacion, Booking, Incident } from '../types';

const PRECIOS: Record<string, number> = { 'DBL': 85, 'SUI': 150, 'IND': 60 };

const HOTEL_DATA: Planta[] = [
  { piso: 1, habitaciones: [
    { numero: '101', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
    { numero: '102', tipo: 'SUI', estado: 'ocupada', precio: PRECIOS['SUI'] },
    { numero: '103', tipo: 'IND', estado: 'sucia', precio: PRECIOS['IND'] },
    { numero: '104', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
  ]},
  { piso: 2, habitaciones: [
    { numero: '201', tipo: 'DBL', estado: 'mantenimiento', precio: PRECIOS['DBL'] },
    { numero: '202', tipo: 'DBL', estado: 'sucia', precio: PRECIOS['DBL'] },
    { numero: '203', tipo: 'SUI', estado: 'libre', precio: PRECIOS['SUI'] },
    { numero: '204', tipo: 'IND', estado: 'ocupada', precio: PRECIOS['IND'] },
  ]},
  { piso: 3, habitaciones: [
    { numero: '301', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
    { numero: '302', tipo: 'SUI', estado: 'libre', precio: PRECIOS['SUI'] },
    { numero: '303', tipo: 'IND', estado: 'sucia', precio: PRECIOS['IND'] },
    { numero: '304', tipo: 'DBL', estado: 'libre', precio: PRECIOS['DBL'] },
  ]}
];

interface HotelStore {
  plantas: Planta[];
  bookings: Booking[];
  incidents: Incident[];
  selectedRoom: Habitacion | null;
  setSelectedRoom: (room: Habitacion | null) => void;
  cambiarEstado: (numero: string, nuevoEstado: Habitacion['estado']) => void;
  addIncident: (incident: Incident) => void;
  addBooking: (booking: Booking) => boolean; // Devuelve true si se pudo añadir (disponibilidad)
  updateBooking: (id: string, updated: Partial<Booking>) => void;
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  plantas: HOTEL_DATA,
  selectedRoom: null,
  incidents: [],
  bookings: [
    { id: '1', guestName: 'García, Daniel', roomNumber: '102', checkIn: new Date(2026, 4, 8), checkOut: new Date(2026, 4, 12), status: 'checked-in', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', guestName: 'Martínez, Ana', roomNumber: '102', checkIn: new Date(2026, 4, 15), checkOut: new Date(2026, 4, 20), status: 'confirmed', createdAt: new Date(), updatedAt: new Date() },
  ],

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  addBooking: (newBooking) => {
    const { bookings } = get();
    // Lógica de Disponibilidad: Verificar que no choque con otras fechas en la misma habitación
    const choque = bookings.some(b => 
      b.roomNumber === newBooking.roomNumber &&
      ((newBooking.checkIn >= b.checkIn && newBooking.checkIn < b.checkOut) ||
       (newBooking.checkOut > b.checkIn && newBooking.checkOut <= b.checkOut))
    );

    if (choque) return false;

    set((state) => ({ bookings: [...state.bookings, newBooking] }));
    return true;
  },

  updateBooking: (id, updated) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, ...updated, updatedAt: new Date() } : b)
  })),

  cambiarEstado: (numero, nuevoEstado) => set((state) => ({
    plantas: state.plantas.map(p => ({
      ...p,
      habitaciones: p.habitaciones.map(h => h.numero === numero ? { ...h, estado: nuevoEstado } : h)
    }))
  })),
  
  addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),
}));