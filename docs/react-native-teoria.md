# Fundamentos de React Native - Hestia PMS

## 1. React Native vs. App Nativa
A diferencia de una aplicación nativa pura (escrita en Swift para iOS o Kotlin para Android), **React Native** nos permite usar JavaScript y React para renderizar componentes nativos reales. 

La diferencia clave no es visual, sino de ejecución:
- **Nativa:** El código se comunica directamente con el hardware.
- **React Native:** Usa un "Bridge" (puente) o la nueva arquitectura (JSI) para que el hilo de JavaScript dé órdenes al hilo de UI nativo. Esto nos permite un desarrollo multiplataforma mucho más rápido sin perder el rendimiento de una interfaz real.

## 2. Metro Bundler
Metro es el "Webpack" de React Native. Su función es coger todo nuestro código JavaScript y sus dependencias y empaquetarlos en un solo archivo (bundle) que el dispositivo móvil sea capaz de entender y ejecutar en tiempo real durante el desarrollo.

## 3. Expo Go vs. Development Builds
- **Expo Go:** Es una herramienta fantástica para prototipado rápido. Nos permite ejecutar la app escaneando un QR sin necesidad de compilar código nativo en nuestro PC.
- **Development Builds:** En proyectos profesionales (como un PMS real), Expo Go se queda corto. Si necesitamos librerías nativas personalizadas (lectores de tarjetas, cámaras específicas o integraciones profundas), necesitamos generar un binario propio. Es el estándar para aplicaciones que irán a producción.

## 4. Sistema de Diseño: Gluestack UI
Para el proyecto Hestia PMS, he optado por **Gluestack UI**. 
*Justificación:* Al venir de un entorno web con **Tailwind CSS**, Gluestack ofrece una flexibilidad similar basada en tokens y utilidad, lo que permite mantener una identidad visual coherente entre la versión web y la móvil del hotel, facilitando la escalabilidad del diseño.