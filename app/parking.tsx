import React from 'react';
import { Box, VStack, Heading, Text, HStack, Badge, BadgeText } from '@gluestack-ui/themed';

export default function ParkingScreen() {
  return (
    <Box flex={1} bg="$white" p="$5">
      <VStack space="md">
        <Heading size="lg">Parking Clientes</Heading>
        
        {[1, 2, 3, 4, 5].map((plaza) => (
          <HStack 
            key={plaza} 
            p="$4" 
            borderWidth={1} 
            borderColor="$slate200" 
            borderRadius="$lg" 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Text fontWeight="$bold">Plaza P-0{plaza}</Text>
            <Badge 
              size="md" 
              variant="solid" 
              action={plaza % 2 === 0 ? 'success' : 'warning'}
            >
              <BadgeText>{plaza % 2 === 0 ? 'Libre' : 'Ocupada'}</BadgeText>
            </Badge>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}