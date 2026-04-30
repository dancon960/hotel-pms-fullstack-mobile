# Gestión del Proyecto: Hotel PMS Mobile

## 1. Metodología de Trabajo
Para el desarrollo de la versión móvil del PMS, se ha implementado una metodología **Kanban** debido a su flexibilidad para gestionar el flujo de trabajo de forma visual y continua. 

El tablero de **Trello** es la herramienta central para la organización, permitiendo identificar cuellos de botella y priorizar las tareas críticas de la fase móvil (Actividad 6).

## 2. Estructura del Tablero
El tablero se organiza en las siguientes columnas:
- **Backlog:** Ideas y funcionalidades futuras (ej. sincronización con AWS).
- **Todo:** Tareas de la Actividad 6 pendientes de inicio.
- **In Progress:** Tareas actualmente en desarrollo (ej. Configuración de Expo Router).
- **Review:** Código pendiente de testeo en el simulador o dispositivo físico.
- **Done:** Funcionalidades completadas y testeadas.

## 3. Descomposición de Tareas
Cada funcionalidad principal se divide en subtareas técnicas para asegurar un desarrollo ordenado:

### Ejemplo: Gestión de Incidencias
1. Definición de interfaces en `types/index.ts`.
2. Configuración de la store en Zustand.
3. Creación de componentes UI (IncidentCard).
4. Implementación de FlashList para el renderizado.
5. Validación de formularios con Zod.

## 4. Enlace al Tablero
Puedes consultar el progreso del desarrollo en tiempo real aquí:
[https://trello.com/invite/b/69e3b5d59d5e6379cd3401c7/ATTI4f2a53c984e0b3f61965137cfb0a02c45A289CA7/desarrollo-app-fullstack]