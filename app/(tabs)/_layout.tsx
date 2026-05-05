import { Tabs } from 'expo-router';
import { Chrome as Home } from 'lucide-react-native'; // Icono básico

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerTitle: 'Hestia Native',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}