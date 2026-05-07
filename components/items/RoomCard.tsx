import React from 'react';
import { Box, Text, HStack, VStack, Heading, Pressable } from '@gluestack-ui/themed'; // Importa Pressable
import { Habitacion } from '../../types';
import { useHotelStore } from '../../store/hotelStore';

export const RoomCard = ({ habitacion }: { habitacion: Habitacion }) => {
  const { bookings, setSelectedRoom } = useHotelStore(); // Traemos la acción de seleccionar

  const clienteActual = bookings.find(
    (b) => b.roomNumber === habitacion.numero && b.status === 'checked-in'
  );

  const statusColor = 
    habitacion.estado === 'libre' ? '$green500' : 
    habitacion.estado === 'ocupada' ? '$blue500' : 
    habitacion.estado === 'sucia' ? '$red500' : '$orange500';

  return (
    // Envolvemos todo en un Pressable
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
          <VStack>
            <Heading size="md">HAB {habitacion.numero}</Heading>
            <Text size="sm" color="$textLight600">
              {habitacion.tipo} - {habitacion.precio}€
            </Text>
            
            {clienteActual && (
              <Text size="xs" color="$blue600" fontWeight="$bold" mt="$1">
                Huésped: {clienteActual.guestName}
              </Text>
            )}
          </VStack>
          
          <Box px="$3" py="$1" borderRadius="$full" bg={statusColor}>
            <Text color="$white" size="xs" fontWeight="$bold">
              {habitacion.estado.toUpperCase()}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
};