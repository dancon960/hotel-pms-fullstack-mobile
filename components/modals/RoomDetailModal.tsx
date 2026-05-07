import React from 'react';
import { 
  Modal, 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Heading, 
  Text, 
  Button, 
  ButtonText,
  VStack, 
  HStack,
  Box
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';

export const RoomDetailModal = () => {
  const { selectedRoom, setSelectedRoom, bookings, cambiarEstado } = useHotelStore();

  if (!selectedRoom) return null;

  const reserva = bookings.find(
    (b) => b.roomNumber === selectedRoom.numero && b.status === 'checked-in'
  );

  return (
    <Modal 
      isOpen={!!selectedRoom} 
      onClose={() => setSelectedRoom(null)}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader borderBottomWidth={1} borderColor="$borderLight100" pb="$3">
          <Heading size="lg">Habitación {selectedRoom.numero}</Heading>
        </ModalHeader>

        <ModalBody py="$5">
          <VStack space="lg">
            <Box p="$4" bg="$secondary50" borderRadius="$md">
              <Heading size="sm" mb="$2" color="$secondary700">Información del Huésped</Heading>
              {reserva ? (
                <VStack space="xs">
                  <Text fontWeight="$bold" color="$textLight900">{reserva.guestName}</Text>
                  <Text size="sm">Entrada: {reserva.checkIn.toLocaleDateString()}</Text>
                  <Text size="sm">Salida: {reserva.checkOut.toLocaleDateString()}</Text>
                </VStack>
              ) : (
                <Text size="sm" italic color="$textLight500">
                  Sin huéspedes activos actualmente.
                </Text>
              )}
            </Box>

            <VStack space="sm">
              {/* CORRECCIÓN: Usamos textTransform en lugar de uppercase */}
              <Text size="xs" fontWeight="$bold" textTransform="uppercase" color="$textLight500">
                Cambiar Estado Operativo
              </Text>
              
              <HStack space="sm" flexWrap="wrap">
                {/* CORRECCIÓN: Si 'action' falla, usamos estilos manuales o verificamos el componente */}
                <Button 
                  size="xs" 
                  bg="$green600"
                  onPress={() => {
                    cambiarEstado(selectedRoom.numero, 'libre');
                    setSelectedRoom(null);
                  }}
                >
                  <ButtonText>Libre</ButtonText>
                </Button>

                <Button 
                  size="xs" 
                  bg="$red600"
                  onPress={() => {
                    cambiarEstado(selectedRoom.numero, 'sucia');
                    setSelectedRoom(null);
                  }}
                >
                  <ButtonText>Sucia</ButtonText>
                </Button>

                <Button 
                  size="xs" 
                  bg="$orange500"
                  onPress={() => {
                    cambiarEstado(selectedRoom.numero, 'mantenimiento');
                    setSelectedRoom(null);
                  }}
                >
                  <ButtonText>Mantenimiento</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth={1} borderColor="$borderLight100" pt="$3">
          <Button
            variant="outline"
            onPress={() => setSelectedRoom(null)}
          >
            <ButtonText>Cerrar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};