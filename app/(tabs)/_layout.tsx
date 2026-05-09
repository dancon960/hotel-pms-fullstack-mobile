import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* 1. DASHBOARD / GENERAL */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'General',
          headerTitle: 'Gestión General',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />

      {/* 2. RESERVAS */}
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Reservas',
          headerTitle: 'Gestión de Reservas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />

      {/* 3. HABITACIONES */}
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

      {/* 4. INCIDENCIAS */}
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