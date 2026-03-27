# Quemenjar

Aplicación para gestionar tu lista de la compra y el inventario de productos de cocina.

## Cómo usar

### Lista de la compra

Muestra los productos que necesitas comprar.

- **+ Añadir producto**: crea un producto nuevo con los campos vacíos y lo añade al principio de la lista
- **Filtrar por tienda**: usa el desplegable superior para ver solo productos de una tienda específica
- **Comprado**: marca el producto como comprado (se suma a tu inventario y se registra la fecha de compra)
- **Editar**: abre el detalle del producto
- **Quitar**: elimina el producto de la lista sin borrarlo del sistema

### Inventario

Muestra los productos que tienes en casa.

- **+ Añadir producto**: crea un producto nuevo con los campos vacíos y lo añade al principio de la lista
- **Filtrar por ubicación**: Todo, Congelador, Nevera, Despensa
- **Mostrar sin stock**: ver también productos con cantidad 0 pero que tienen reposición automática configurada
- **Auto add**: al estar activado, añade el producto a la lista de la compra cuando la cantidad del producto llega a 0
- **Editar**: abre el detalle del producto
- **Delete**: elimina el producto del sistema permanentemente

### Detalle del producto

Al pulsar "Editar" accedes a la ficha completa del producto:

| Campo | Descripción |
|-------|-------------|
| Nombre | Nombre del producto |
| Cantidad | Cantidad actual en casa |
| A comprar | Cantidad que necesitas comprar |
| Auto agregar | Si configuras un valor, el producto se añadirá automáticamente a la lista cuando baje de esa cantidad |
| Almacenaje | Dónde guardas el producto (Nevera, Congelador, Despensa) |
| Tienda | Tienda donde sueles comprarlo |
| Fecha de compra | Fecha de última compra |
| Fecha de caducidad | Fecha de caducidad |
| Nota | Notas adicionales |

Los cambios se guardan automáticamente.