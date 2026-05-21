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
  TextareaInput,
  Input,
  InputField
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';
import { incidentSchema, Incident } from '../../types';

export default function IncidenciasScreen() {
  // Traemos también resolveIncident del store
  const { incidents, addIncident, resolveIncident } = useHotelStore();
  const [showModal, setShowModal] = useState(false);
  
  const [roomNum, setRoomNum] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const newIncident: Incident = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      roomNumber: roomNum,
      description: description,
      status: 'open', 
      priority: 'medium', 
      title: `Incidencia Hab. ${roomNum}`, 
    };

    const result = incidentSchema.safeParse(newIncident);

    if (!result.success) {
      setError("Por favor, rellena todos los campos correctamente.");
      return;
    }

    addIncident(newIncident);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowModal(false);
    setRoomNum('');
    setDescription('');
    setError(null);
  };

  // Función para cuando pulsamos el botón de finalizar
  const handleResolve = (id: string) => {
    resolveIncident(id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
            incidents.map((item: Incident) => (
              <Box 
                key={item.id} 
                p="$4" 
                bg="$white" 
                borderRadius="$lg" 
                softShadow="1"
                borderLeftWidth={4}
                // Si está abierta se ve roja, si está finalizada (closed) se ve verde
                borderLeftColor={item.status === 'open' ? '$red500' : '$green500'}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Heading size="sm" color="$slate800">Habitación {item.roomNumber}</Heading>
                  <Box 
                    px="$2" 
                    py="$0.5" 
                    bg={item.status === 'open' ? '$red50' : '$green50'} 
                    borderRadius="$sm"
                  >
                    <Text 
                      size="xs" 
                      color={item.status === 'open' ? '$red600' : '$green600'} 
                      fontWeight="$bold" 
                      textTransform="uppercase"
                    >
                      {item.status === 'open' ? 'Abierta' : 'Finalizada'}
                    </Text>
                  </Box>
                </HStack>
                <Text size="sm" mt="$2" color="$slate600">{item.description}</Text>
                
                <HStack justifyContent="space-between" alignItems="center" mt="$3">
                  <Text size="xs" color="$slate400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                  
                  {/* Si la incidencia está abierta ('open'), pintamos el botón para darla por terminada */}
                  {item.status === 'open' && (
                    <Button 
                      size="xs" 
                      bg="$green600" 
                      onPress={() => handleResolve(item.id)}
                      borderRadius="$md"
                    >
                      <ButtonText size="xs">Finalizar</ButtonText>
                    </Button>
                  )}
                </HStack>
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>

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