# Configuración de Herramientas de IA

## 1. Contexto del Proyecto
Para asegurar que las herramientas de IA generen código coherente con la arquitectura de Hestia Native, se ha definido el siguiente contexto técnico:
- **Stack:** React Native (Expo), TypeScript, Expo Router.
- **Estado Global:** Zustand con persistencia local (AsyncStorage).
- **Estilos:** Gluestack UI (basado en tokens).
- **Validación:** Zod.

## 2. Instrucciones Persistentes (Custom Instructions)
Se han configurado las herramientas de IA (Gemini/Cursor) con las siguientes restricciones:
- **Prioridad de Tipado:** Siempre generar interfaces antes que lógica de componentes.
- **Arquitectura:** Seguir la estructura de carpetas `app/`, `components/`, `store/` y `types/`.
- **Estilo de Código:** Usar componentes funcionales y Hooks personalizados para separar la lógica de la UI.
- **Nomenclatura:** Mantener términos relacionados con la gestión hotelera (Rooms, Bookings, Housekeeping).

## 3. Archivo .cursorrules (Opcional)
Se ha preparado la base para un archivo `.cursorrules` en la raíz del proyecto para centralizar estas normas y evitar alucinaciones en la generación de código nativo.