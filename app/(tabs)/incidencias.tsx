import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { 
  Box, 
  VStack, 
  Text, 
  Heading, 
  Button, 
  ButtonText, 
  Input, 
  InputField, 
  FormControl, 
  FormControlLabel, 
  FormControlLabelText,
  AddIcon,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
  Textarea,
  TextareaInput
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';
import { incidentSchema, Incident } from '../../types';

export default function IncidenciasScreen() {
  const { incidents, addIncident } = useHotelStore();
  const [showModal, setShowModal] = useState(false);
  
  const [roomNum, setRoomNum] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    // Forzamos el objeto para que cumpla estrictamente con la interfaz Incident
    const newIncident: Incident = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      roomNumber: roomNum,
      description: description,
      status: 'open' as 'open', // Aseguramos el literal exacto
      priority: 'medium' as 'medium', // Aseguramos el literal exacto
      title: `Incidencia Hab. ${roomNum}`, // Así queda especificada la incidencia en la lista
    };

    const result = incidentSchema.safeParse(newIncident);

    if (!result.success) {
      setError("Por favor, rellena todos los campos correctamente.");
      return;
    }

    addIncident(newIncident);
// Vibración de éxito
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowModal(false);
    setRoomNum('');
    setDescription('');
    setError(null);
  };

  return (
    <Box flex={1} bg="$slate50" p="$4">
      <HStack justifyContent="space-between" alignItems="center" mb="$5">
        <Heading size="xl" color="$slate900">Incidencias</Heading>
        <Button size="sm" onPress={() => setShowModal(true)} bg="$blue600" borderRadius="$md">
          <Icon as={AddIcon} color="$white" mr="$2" />
          <ButtonText>Nueva</ButtonText>
        </Button>
      </HStack>

      <ScrollView>
        <VStack space="md">
          {incidents.length === 0 ? (
            <Box p="$10" alignItems="center">
              <Text color="$slate400">No hay incidencias registradas</Text>
            </Box>
          ) : (
            // Forzamos el tipo Incident aquí para que reconozca .status
            incidents.map((item: Incident) => (
              <Box 
                key={item.id} 
                p="$4" 
                bg="$white" 
                borderRadius="$lg" 
                softShadow="1"
                borderLeftWidth={4}
                borderLeftColor={item.status === ('pending' as string) ? '$orange400' : '$green400'}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading size="sm" color="$slate800">Habitación {item.roomNumber}</Heading>
                  <Box 
                    px="$2" 
                    py="$0.5" 
                    bg={item.status === ('pending' as string) ? '$orange50' : '$green50'} 
                    borderRadius="$sm"
                  >
                    <Text 
                      size="xs" 
                      color={item.status === ('pending' as string) ? '$orange600' : '$green600'} 
                      fontWeight="$bold" 
                      textTransform="uppercase"
                    >
                      {item.status}
                    </Text>
                  </Box>
                </HStack>
                <Text size="sm" mt="$2" color="$slate600">{item.description}</Text>
                <Text size="xs" mt="$3" color="$slate400" textAlign="right">
                  {item.createdAt.toLocaleDateString()}
                </Text>
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>

      {/* Modal corregido sin props problemáticas */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader borderBottomWidth={1} borderColor="$borderLight100">
            <Heading size="md">Reportar Incidencia</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg" py="$4">
              {error && (
                <Box bg="$red50" p="$2" borderRadius="$sm">
                  <Text color="$red600" size="xs">{error}</Text>
                </Box>
              )}
              
              <FormControl isRequired>
                <FormControlLabel>
                  <FormControlLabelText>Número de Habitación</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField 
                    placeholder="Ej: 102" 
                    value={roomNum} 
                    onChangeText={setRoomNum} 
                  />
                </Input>
              </FormControl>

              <FormControl isRequired>
                <FormControlLabel>
                  <FormControlLabelText>Descripción del problema</FormControlLabelText>
                </FormControlLabel>
                <Textarea size="md">
                  <TextareaInput 
                    placeholder="Describe la avería..." 
                    value={description} 
                    onChangeText={setDescription}
                  />
                </Textarea>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth={1} borderColor="$borderLight100">
            <Button variant="outline" onPress={() => setShowModal(false)} mr="$2">
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button onPress={handleSave} bg="$blue600">
              <ButtonText>Guardar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}