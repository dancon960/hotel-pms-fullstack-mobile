import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Badge, 
  BadgeText,
  Divider,
  CalendarDaysIcon,
  Icon
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';

export default function ReservasScreen() {
  const { bookings } = useHotelStore();

  return (
    <Box flex={1} bg="$slate50" p="$4">
      <Heading size="xl" mb="$4" color="$slate900">Listado de Reservas</Heading>
      
      <ScrollView>
        <VStack space="md">
          {bookings.map((reserva) => (
            <Box 
              key={reserva.id} 
              p="$4" 
              bg="$white" 
              borderRadius="$lg" 
              softShadow="1"
            >
              <HStack justifyContent="space-between" alignItems="flex-start">
                <VStack space="xs">
                  <Text size="xs" color="$blue600" fontWeight="$bold" textTransform="uppercase">
                    Habitación {reserva.roomNumber}
                  </Text>
                  <Heading size="md" color="$slate800">{reserva.guestName}</Heading>
                </VStack>
                
                <Badge 
                  size="md" 
                  variant="solid" 
                  borderRadius="$full" 
                  action={reserva.status === 'checked-in' ? 'success' : 'warning'}
                >
                  <BadgeText>{reserva.status}</BadgeText>
                </Badge>
              </HStack>

              <Divider my="$3" />

              <HStack space="md" alignItems="center">
                {/* Usamos el icono que sí tienes en la librería */}
                <Icon as={CalendarDaysIcon} color="$slate400" size="sm" />
                <VStack>
                  <Text size="xs" color="$slate500">Estancia</Text>
                  <Text size="sm" fontWeight="$medium" color="$slate700">
                    {reserva.checkIn.toLocaleDateString()} — {reserva.checkOut.toLocaleDateString()}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}