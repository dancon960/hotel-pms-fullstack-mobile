import React from 'react';
import { useRouter } from 'expo-router';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Icon, 
  Pressable, 
  ChevronRightIcon, 
  Divider 
} from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

export default function MenuScreen() {
  const router = useRouter();

  // Componente interno para las filas del menú
  const MenuOption = ({ title, icon, route }: { title: string, icon: any, route: string }) => (
    <Pressable 
      onPress={() => router.push(route)}
      style={({ pressed }) => ({
        backgroundColor: pressed ? '$slate100' : '$white',
      })}
    >
      <HStack 
        p="$4" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <HStack space="md" alignItems="center">
          <Ionicons name={icon} size={24} color="#007AFF" />
          <Text size="md" color="$slate800" fontWeight="$medium">{title}</Text>
        </HStack>
        <Icon as={ChevronRightIcon} color="$slate400" />
      </HStack>
    </Pressable>
  );

  return (
    <Box flex={1} bg="$slate50">
      <VStack space="xs" p="$5">
        <Heading size="xl" color="$slate900">Servicios</Heading>
        <Text size="sm" color="$slate500">Gestión de servicios adicionales</Text>
      </VStack>

      {/* AQUÍ ESTÁ EL LISTADO: Asegúrate de ver los dos MenuOption */}
      <Box bg="$white" mt="$2" borderTopWidth={1} borderBottomWidth={1} borderColor="$slate200">
        
        {/* Opción 1: Parking */}
        <MenuOption 
          title="Parking de Clientes" 
          icon="car-outline" 
          route="/parking" 
        />
        
        <Divider />

        {/* Opción 2: Cajas Fuertes */}
        <MenuOption 
          title="Seguridad (Caja Fuerte)" 
          icon="lock-closed-outline" 
          route="/cajas-fuertes" 
        />

        <Divider />

        {/* Opción 3: Ejemplo de otra opción futura */}
        <MenuOption 
          title="Gimnasio y Spa" 
          icon="fitness-outline" 
          route="/menu" 
        />

      </Box>

      <Box p="$4" mt="$10">
        <Text size="xs" color="$slate400" textAlign="center">Hotel Flow PMS • 2026</Text>
      </Box>
    </Box>
  );
}