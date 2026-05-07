import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; 

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="incidencias/nueva" options={{ presentation: 'modal', title: 'Reportar Incidencia' }} />
      </Stack>
    </GluestackUIProvider>
  );
}