import React from 'react';
import { Box, Text, HStack, VStack, Heading } from '@gluestack-ui/themed';
import { Habitacion } from '../../types'; // <--- Cambiado de RoomStatus a Habitacion

export const RoomCard = ({ habitacion }: { habitacion: Habitacion }) => {
  // Color según tu lógica de la web: libre (verde), ocupada (azul), sucia (roja), mantenimiento (naranja)
  const statusColor = 
    habitacion.estado === 'libre' ? '$green500' : 
    habitacion.estado === 'ocupada' ? '$blue500' : 
    habitacion.estado === 'sucia' ? '$red500' : '$orange500';

  return (
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
          {/* Cambiado de roomNumber a numero */}
          <Heading size="md">HAB {habitacion.numero}</Heading> 
          <Text size="sm" color="$textLight600">
            {habitacion.tipo} - {habitacion.precio}€
          </Text>
        </VStack>
        
        <Box px="$3" py="$1" borderRadius="$full" bg={statusColor}>
          <Text color="$white" size="xs" fontWeight="$bold">
            {/* Cambiado de cleaningStatus a estado */}
            {habitacion.estado.toUpperCase()}
          </Text>
        </Box>
      </HStack>

      {/* Si hay un cliente (como en tu inventario), lo mostramos */}
      {habitacion.cliente && (
        <Text size="xs" color="$textLight500" mt="$2" italic={true}>
          Cliente: {habitacion.cliente}
        </Text>
      )}
    </Box>
  );
};