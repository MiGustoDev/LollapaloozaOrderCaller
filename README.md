# Mi Gusto - Llamador de pedidos

Sistema offline de gestión de pedidos para Lollapalooza Buenos Aires.

## Características

- **100% Offline**: Funciona completamente sin conexión a internet usando LocalStorage
- **Dos vistas principales**:
  - **Contador**: Gestión de pedidos con botones táctiles grandes
  - **Llamador**: Display vertical optimizado para TV 1080x1920

### Vista Contador

1. **Incrementar/Decrementar**: Usa los botones +1 y -1 para ajustar el número del pedido
2. **Enviar a Llamador**: Presiona el botón amarillo para agregar el pedido actual a "En Preparación"
3. **Gestionar Pedidos**:
   - Usa el botón de flecha verde para mover un pedido de "En Preparación" a "A Retirar"
   - Usa el botón rojo para eliminar un pedido

### Vista Llamador

- Pantalla dividida verticalmente:
  - **En Preparación** (60% superior - fondo naranja)
  - **A Retirar** (40% inferior - fondo verde)
- Los números se muestran en grillas de 3 columnas
- Optimizado para visualización a distancia en TV vertical

## Persistencia de Datos

Todos los datos se guardan automáticamente en LocalStorage del navegador. Los pedidos persisten incluso al recargar la página.

## Tecnologías

- React 18
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage API
