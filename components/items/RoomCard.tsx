import React from 'react';
import { 
  Box, 
  Text, 
  HStack, 
  VStack, 
  Heading, 
  Pressable 
} from '@gluestack-ui/themed';
import { Habitacion } from '../../types';
import { useHotelStore } from '../../store/hotelStore';

export const RoomCard = ({ habitacion }: { habitacion: Habitacion }) => {
  // Traemos las reservas y la función para seleccionar habitación del Store
  const { bookings, setSelectedRoom } = useHotelStore();

  // Buscamos si hay un cliente alojado actualmente en esta habitación
  const clienteActual = bookings.find(
    (b) => b.roomNumber === habitacion.numero && b.status === 'checked-in'
  );

  // Definimos el color según el estado
  const statusColor = 
    habitacion.estado === 'libre' ? '$green500' : 
    habitacion.estado === 'ocupada' ? '$blue500' : 
    habitacion.estado === 'sucia' ? '$red500' : '$orange500';

  return (
    <Pressable onPress={() => setSelectedRoom(habitacion)}>
      <Box 
        p="$4" 
        m="$2" 
        borderRadius="$lg" 
        bg="$white" 
        softShadow="2"
        borderLeftWidth={10}
        borderLeftColor={statusColor}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack space="xs">
            <Heading size="md" color="$slate800">HAB {habitacion.numero}</Heading>
            <Text size="sm" color="$slate500">
              {habitacion.tipo} — {habitacion.precio}€
            </Text>
            
            {/* Si hay un cliente en los bookings, mostramos su nombre */}
            {clienteActual && (
              <Box mt="$1" px="$2" py="$0.5" bg="$blue50" borderRadius="$sm" alignSelf="flex-start">
                <Text size="xs" color="$blue700" fontWeight="$bold">
                  Huésped: {clienteActual.guestName}
                </Text>
              </Box>
            )}
          </VStack>
          
          <Box px="$3" py="$1" borderRadius="$full" bg={statusColor}>
            <Text color="$white" size="xs" fontWeight="$bold" textTransform="uppercase">
              {habitacion.estado}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
};