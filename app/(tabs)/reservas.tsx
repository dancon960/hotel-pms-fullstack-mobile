import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Box, VStack, HStack, Text, Heading, Accordion, AccordionItem, 
  AccordionHeader, AccordionTrigger, AccordionContent, AccordionIcon,
  ChevronDownIcon, ChevronUpIcon, Divider, Badge, BadgeText
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';

export default function ReservasScreen() {
  const { plantas, bookings } = useHotelStore();

  return (
    <Box flex={1} bg="$slate50">
      <ScrollView>
        <Box p="$4">
          <Heading size="xl" mb="$4" color="$slate900">Planning de Ocupación</Heading>
          
          <Accordion width="100%" type="single" isCollapsible={true}>
            {plantas.map((planta) => (
              <AccordionItem value={`p-${planta.piso}`} key={planta.piso} mb="$2" bg="$white" borderRadius="$lg">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => (
                      <>
                        <Text fontWeight="$bold" color="$slate800">PLANTA {planta.piso}</Text>
                        <AccordionIcon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} ml="$3" />
                      </>
                    )}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent pb="$4">
                  <VStack space="md">
                    {planta.habitaciones.map((hab) => {
                      const resHabs = bookings.filter(b => b.roomNumber === hab.numero);

                      return (
                        <Box key={hab.numero} p="$3" bg="$slate50" borderRadius="$md" borderWidth={1} borderColor="$slate200">
                          <Heading size="xs" mb="$2" color="$blue700">Habitación {hab.numero}</Heading>
                          {resHabs.length === 0 ? (
                            <Text size="xs" italic color="$slate400">Sin reservas registradas</Text>
                          ) : (
                            resHabs.map((res, index) => (
                              <VStack key={res.id}>
                                <HStack justifyContent="space-between" py="$1">
                                  <VStack>
                                    <Text size="sm" fontWeight="$bold" color="$slate800">{res.guestName}</Text>
                                    <Text size="xs" color="$slate500">
                                      {new Date(res.checkIn).toLocaleDateString()} - {new Date(res.checkOut).toLocaleDateString()}
                                    </Text>
                                  </VStack>
                                  <Badge action={res.status === 'checked-in' ? 'success' : 'info'} variant="outline" borderRadius="$full">
                                    <BadgeText size="xs">{res.status}</BadgeText>
                                  </Badge>
                                </HStack>
                                {index < resHabs.length - 1 && <Divider my="$1" />}
                              </VStack>
                            ))
                          )}
                        </Box>
                      );
                    })}
                  </VStack>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </ScrollView>
    </Box>
  );
}