import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Azul para resaltar la pestaña activa
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* 1. RESERVAS (Antiguo index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Reservas',
          headerTitle: 'Gestión de Reservas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      {/* 2. HABITACIONES (Con limpieza asimilada) */}
      <Tabs.Screen
        name="habitaciones"
        options={{
          title: 'Habitaciones',
          headerTitle: 'Estado del Hotel',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bed" size={size} color={color} />
          ),
        }}
      />

      {/* 3. INCIDENCIAS (Mantenimiento) */}
      <Tabs.Screen
        name="incidencias"
        options={{
          title: 'Incidencias',
          headerTitle: 'Mantenimiento y Avisos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}