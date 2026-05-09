import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Divider,
  View
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';

export default function GeneralScreen() {
  const { plantas, incidents, bookings } = useHotelStore();

  // Aplanamos todas las habitaciones de todas las plantas para contar
  const todasHabs = plantas.flatMap(p => p.habitaciones);
  
  const stats = {
    total: todasHabs.length,
    libres: todasHabs.filter(h => h.estado === 'libre').length,
    ocupadas: todasHabs.filter(h => h.estado === 'ocupada').length,
    sucias: todasHabs.filter(h => h.estado === 'sucia').length,
    incidencias: incidents.filter(i => i.status === 'open').length,
    reservasHoy: bookings.length // Opcional: mostrar cuántas reservas hay en el sistema
  };

  return (
    <Box flex={1} bg="$slate50">
      <ScrollView>
        <VStack p="$5" space="lg">
          
          {/* Bienvenida */}
          <VStack space="xs" mb="$2">
            <Heading size="xl" color="$slate900">Estado del Hotel</Heading>
            <Text size="sm" color="$slate500">Resumen operativo para hoy</Text>
          </VStack>

          {/* Tarjeta Principal: Ocupación */}
          <Box p="$5" bg="$blue600" borderRadius="$2xl" softShadow="3">
            <VStack space="xs">
              <Text color="$blue100" fontWeight="$bold" size="sm">OCUPACIÓN ACTUAL</Text>
              <HStack alignItems="flex-end" space="xs">
                <Heading size="3xl" color="$white">
                  {Math.round((stats.ocupadas / stats.total) * 100)}%
                </Heading>
                <Text color="$blue100" pb="$1">de capacidad total</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Cuadrícula de contadores */}
          <HStack space="md">
            <Box flex={1} p="$4" bg="$white" borderRadius="$xl" borderWidth={1} borderColor="$slate200">
              <Text size="xs" color="$slate500" fontWeight="$bold">LIBRES</Text>
              <Heading size="lg" color="$green600">{stats.libres}</Heading>
            </Box>
            <Box flex={1} p="$4" bg="$white" borderRadius="$xl" borderWidth={1} borderColor="$slate200">
              <Text size="xs" color="$slate500" fontWeight="$bold">SUCIAS</Text>
              <Heading size="lg" color="$red500">{stats.sucias}</Heading>
            </Box>
          </HStack>

          <HStack space="md">
            <Box flex={1} p="$4" bg="$white" borderRadius="$xl" borderWidth={1} borderColor="$slate200">
              <Text size="xs" color="$slate500" fontWeight="$bold">AVISOS MANT.</Text>
              <Heading size="lg" color="$orange500">{stats.incidencias}</Heading>
            </Box>
            <Box flex={1} p="$4" bg="$white" borderRadius="$xl" borderWidth={1} borderColor="$slate200">
              <Text size="xs" color="$slate500" fontWeight="$bold">TOTAL HABS</Text>
              <Heading size="lg" color="$slate800">{stats.total}</Heading>
            </Box>
          </HStack>

          <Divider my="$2" />

          {/* Sección de aviso rápido */}
          <Box p="$4" bg="$orange50" borderRadius="$lg" borderWidth={1} borderColor="$orange200">
            <VStack space="xs">
              <Heading size="xs" color="$orange800">ATENCIÓN REQUERIDA</Heading>
              <Text size="sm" color="$orange700">
                {stats.sucias > 0 
                  ? `Hay ${stats.sucias} habitaciones que necesitan limpieza inmediata.` 
                  : "Todas las habitaciones están listas para recibir clientes."}
              </Text>
            </VStack>
          </Box>

        </VStack>
      </ScrollView>
    </Box>
  );
}