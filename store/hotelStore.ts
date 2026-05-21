import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Importamos persistencia
import AsyncStorage from '@react-native-async-storage/async-storage'; // El "disco duro" del móvil
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
  resolveIncident: (id: string) => void;
  addBooking: (booking: Booking) => boolean;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
}

export const useHotelStore = create<HotelStore>()(
  persist(
    (set, get) => ({
      plantas: HOTEL_DATA,
      selectedRoom: null,
      incidents: [],
      bookings: [
        { id: '1', guestName: 'García, Daniel', roomNumber: '102', checkIn: new Date(2026, 4, 8), checkOut: new Date(2026, 4, 12), status: 'checked-in', createdAt: new Date(), updatedAt: new Date() },
      ],

      setSelectedRoom: (room) => set({ selectedRoom: room }),

      cambiarEstado: (numero, nuevoEstado) => set((state) => ({
        plantas: state.plantas.map(p => ({
          ...p,
          habitaciones: p.habitaciones.map(h => h.numero === numero ? { ...h, estado: nuevoEstado } : h)
        }))
      })),

      addIncident: (incident) => set((state) => ({ incidents: [...state.incidents, incident] })),

      resolveIncident: (id) => set((state) => ({
        incidents: state.incidents.map(inc => 
          inc.id === id ? { ...inc, status: 'closed' as any } : inc
        )
      })),

      addBooking: (newBooking) => {
        const { bookings } = get();
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
        bookings: state.bookings.map(b => b.id === id ? { ...b, ...updated } : b)
      })),
    }),
    {
      name: 'hotel-pms-storage', // Nombre de la "base de datos" local
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);