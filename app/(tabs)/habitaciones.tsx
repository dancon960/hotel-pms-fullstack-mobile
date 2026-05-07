import React from 'react';
import { ScrollView } from 'react-native';
import { 
  Box, 
  VStack, 
  Text, 
  Accordion, 
  AccordionItem, 
  AccordionHeader, 
  AccordionTrigger, 
  AccordionContent,
  AccordionIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Heading
} from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';
import { RoomCard } from '../../components/items/RoomCard';
// Añadimos la importación del Modal
import { RoomDetailModal } from '../../components/modals/RoomDetailModal';

export default function HabitacionesScreen() {
  const { plantas } = useHotelStore();

  return (
    <Box flex={1} bg="$slate50">
      <ScrollView style={{ flex: 1 }}>
        <Box p="$4">
          <Heading size="xl" mb="$4" color="$slate900">Plantas del Hotel</Heading>
          
          <Accordion 
            width="100%" 
            size="md" 
            variant="filled" 
            type="single" 
            isCollapsible={true}
          >
            {plantas.map((planta) => (
              <AccordionItem value={`planta-${planta.piso}`} key={planta.piso} mb="$2" borderRadius="$lg" bg="$white">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => (
                      <>
                        <Text fontWeight="$bold" fontSize="$md" color="$slate800">
                          PLANTA {planta.piso} 
                          <Text size="xs" color="$slate500" fontWeight="$normal">  • {planta.habitaciones.length} habs</Text>
                        </Text>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} ml="$3" />
                        ) : (
                          <AccordionIcon as={ChevronDownIcon} ml="$3" />
                        )}
                      </>
                    )}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent bg="$slate50" pb="$4">
                  <VStack space="xs">
                    {planta.habitaciones.map((hab) => (
                      <RoomCard key={hab.numero} habitacion={hab} />
                    ))}
                  </VStack>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </ScrollView>

      {/* IMPORTANTE: El modal se pone aquí al final para que esté siempre "escuchando" */}
      <RoomDetailModal />
    </Box>
  );
}