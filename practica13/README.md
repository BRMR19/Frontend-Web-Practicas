# Práctica 13 

**¿Por qué el Layout no necesita saber que es una tienda?**
Porque solo reparte tres huecos: recibe el encabezado y el pie por props y el contenido
por `children`. No importa productos, carrito ni precios, así que el mismo Layout
serviría para un blog o un panel de administración. Quien sabe que es una tienda es
`App`, que decide qué se coloca en cada hueco. Es composición: el componente de diseño
no se acopla al contenido.

**¿Qué pasa si escribes `onClick={onAgregar(producto)}` sin la flecha?**
Con los paréntesis la función se ejecuta al pintar la tarjeta, no al hacer clic, y lo que
recibe `onClick` es su resultado (`undefined`) en lugar de una función. En mi prueba la
consola imprimió los 12 `Agregado:` al cargar la página y el clic no hizo nada; el editor
además marcó un error de tipos. Cuando la función cambia el estado, cada pintada lo
dispararía de nuevo y se formaría un ciclo infinito. La flecha
`() => onAgregar(producto)` crea una función que se ejecuta hasta el clic.

**¿Por qué con `carrito.push(...)` el contador no se mueve y no sale ningún error?**
`push` modifica el arreglo existente, pero React decide si repintar comparando la
referencia del valor del estado: si es el mismo objeto, asume que no cambió nada. Como
`push` conserva la misma referencia y nunca se llama a `setCarrito`, React no se entera.
No es un error del lenguaje, es una mutación válida de JavaScript, y por eso no hay
mensaje. Con `setCarrito([...carrito, producto])` el arreglo es nuevo, la referencia
cambia y React repinta.
