import { useColorScheme } from 'react-native';

export const Colors = {
  light: {
    primary: '#007AFF', // Azul corporativo
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#1C1C1E',
    border: '#C6C6C8',
    notification: '#FF3B30', // Para incidencias
  },
  dark: {
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#F2F2F7',
    border: '#38383A',
    notification: '#FF453A',
  },
};

export const Typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? Colors.dark : Colors.light;
};