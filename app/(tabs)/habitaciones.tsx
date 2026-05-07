import { ScrollView } from 'react-native';
import { Box, VStack, Heading, Text, Pressable } from '@gluestack-ui/themed';
import { useHotelStore } from '../../store/hotelStore';

export default function HabitacionesScreen() {
  const { plantas, cambiarEstado } = useHotelStore();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      <Box p="$4">
        {plantas.map((p) => (
          <VStack key={p.piso} mb="$6">
            <Heading size="md" mb="$3">PLANTA {p.piso}</Heading>
            
            {p.habitaciones.map((h) => (
              <Pressable 
                key={h.numero} 
                onPress={() => {
                  // Ejemplo rápido de acción: rotar estados
                  const siguiente = h.estado === 'libre' ? 'ocupada' : 'libre';
                  cambiarEstado(h.numero, siguiente);
                }}
              >
                <Box 
                  p="$4" bg="$white" mb="$2" borderRadius="$lg" softShadow="1"
                  borderLeftWidth={10}
                  borderLeftColor={h.estado === 'libre' ? '$green500' : h.estado === 'ocupada' ? '$blue500' : '$red500'}
                >
                  <Text fontWeight="$bold">HAB {h.numero} - {h.tipo}</Text>
                  <Text size="sm">{h.estado.toUpperCase()} {h.cliente ? `(${h.cliente})` : ''}</Text>
                </Box>
              </Pressable>
            ))}
          </VStack>
        ))}
      </Box>
    </ScrollView>
  );
}