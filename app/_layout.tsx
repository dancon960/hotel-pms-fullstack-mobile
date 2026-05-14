import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* Estas pantallas serán modales que se abren desde cualquier sitio */}
        <Stack.Screen name="servicios" options={{ presentation: 'modal', title: 'Servicios' }} />
        <Stack.Screen name="parking" options={{ presentation: 'modal', headerShown: true, title: 'Parking' }} />
        <Stack.Screen name="cajas-fuertes" options={{ presentation: 'modal', headerShown: true, title: 'Caja Fuerte' }} />
      </Stack>
    </GluestackUIProvider>
  );
}