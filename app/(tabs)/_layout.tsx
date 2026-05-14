import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        // El botón del menú que ya te funciona
        headerLeft: () => (
          <Pressable 
            onPress={() => router.push('/servicios')} 
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="#007AFF" />
          </Pressable>
        ),
      }}
    >
      {/* 1. GENERAL */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'General', 
          headerTitle: 'Panel de Control',
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
          headerTitle: 'Planning',
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
          headerTitle: 'Estado de Habitaciones',
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
          headerTitle: 'Mantenimiento',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}