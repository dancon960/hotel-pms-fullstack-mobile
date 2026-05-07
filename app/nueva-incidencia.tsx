import React from 'react';
import { Box, VStack, Input, InputField, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorText, Textarea, TextareaInput } from '@gluestack-ui/themed';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // Tendrás que instalarlo si quieres manejar el estado fácil
import { zodResolver } from '@hookform/resolvers/zod';
import { incidentSchema, IncidentFormData } from '../types';
import { useHotelStore } from '../store/hotelStore';
import { useRouter } from 'expo-router';

export default function NuevaIncidenciaScreen() {
  const addIncident = useHotelStore((state) => state.addIncident);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
    defaultValues: { title: '', roomNumber: '', priority: 'low', description: '' }
  });

  const onSubmit = (data: IncidentFormData) => {
    addIncident({
      ...data,
      id: Math.random().toString(), // ID temporal
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    router.back(); // Cierra el modal al terminar
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Box p="$4" bg="$white" flex={1}>
          <VStack space="xl">
            {/* Campo Título */}
            <FormControl isInvalid={!!errors.title}>
              <FormControlLabel><FormControlLabelText>Título</FormControlLabelText></FormControlLabel>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input><InputField placeholder="Ej: Grifo roto" onBlur={onBlur} onChangeText={onChange} value={value} /></Input>
                )}
              />
              <FormControlError><FormControlErrorText>{errors.title?.message}</FormControlErrorText></FormControlError>
            </FormControl>

            {/* Campo Habitación */}
            <FormControl isInvalid={!!errors.roomNumber}>
              <FormControlLabel><FormControlLabelText>Habitación</FormControlLabelText></FormControlLabel>
              <Controller
                control={control}
                name="roomNumber"
                render={({ field: { onChange, value } }) => (
                  <Input><InputField placeholder="101" onChangeText={onChange} value={value} /></Input>
                )}
              />
            </FormControl>

            {/* Botón Guardar */}
            <Button onPress={handleSubmit(onSubmit)} mt="$4">
              <ButtonText>Reportar Incidencia</ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}