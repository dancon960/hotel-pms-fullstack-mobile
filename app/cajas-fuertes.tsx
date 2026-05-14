import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Button, ButtonText, Center } from '@gluestack-ui/themed';

export default function CajasFuertesScreen() {
  const [code, setCode] = useState<string | null>(null);

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode);
  };

  return (
    <Box flex={1} bg="$white" p="$5">
      {/* Importante: space="$xl" (con $) */}
      <VStack space="xl">
        <Heading size="lg">Seguridad</Heading>
        <Text size="sm" color="$slate500">Código temporal para la caja fuerte.</Text>
        
        <Center p="$10" bg="$slate100" borderRadius="$xl">
          <Text size="xs" fontWeight="$bold" mb="$2">CÓDIGO ACTUAL</Text>
          <Heading size="3xl" color="$blue600">{code || '------'}</Heading>
        </Center>

        <Button onPress={generateCode} size="lg" bg="$blue600">
          <ButtonText>Generar Nuevo Código</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}