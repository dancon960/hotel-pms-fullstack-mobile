import { Text } from 'react-native';
import { Center, Heading, Box } from '@gluestack-ui/themed';

export default function HomeScreen() {
  return (
    <Box flex={1} bg="$backgroundLight50">
      <Center h="$full">
        <Heading size="xl">Hestia Native</Heading>
        <Text>El sistema de gestión está listo.</Text>
      </Center>
    </Box>
  );
}