# Práctica 14 

**¿Por qué en la pestaña Red salen dos peticiones al cargar?**
En desarrollo, `main.tsx` envuelve la app en `<StrictMode>`, que monta el componente,
lo desmonta y lo vuelve a montar para detectar efectos sin limpieza. Por eso el efecto
corre dos veces y se pide `/productos` dos veces. La primera se cancela con
`AbortController` en la función de limpieza. En producción solo hay una.

**¿Qué pasa si quitas el arreglo de dependencias del efecto?**
El efecto se ejecuta después de cada pintada: pide los productos, `setProductos` cambia
el estado, eso provoca otra pintada y el efecto corre de nuevo, en un ciclo infinito. En la
pestaña Red se ven peticiones sin parar (captura `red-sin-dependencias.png`). Con
`[intento]` solo se repite cuando ese valor cambia.

**¿Qué hace `e.preventDefault()` y qué pasa si lo quitas?**
Cancela el comportamiento por defecto del navegador al enviar un formulario, que es
hacer una petición y recargar la página. Al quitarlo, la página se recargó sola al pulsar
Pagar: se perdió el estado (carrito, filtro y lo escrito), la URL cambió a `/?` y el
pedido nunca se envió con Axios.
