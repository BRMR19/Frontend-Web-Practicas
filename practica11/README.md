# Práctica 11 – Componentes con TypeScript puro

## Ejercicio 1: botón reutilizable

**¿Qué pasó al cambiar la variante en el HTML sin tocar el TypeScript?**
El botón cambió de aspecto al instante. `variante` está en `observedAttributes`, así que
el navegador llama a `attributeChangedCallback`, que vuelve a pintar el botón con la
clase nueva (`primario`, `secundario` o `peligro`). Con un nombre sin estilo, como
`danger`, el botón se ve sin formato, porque el CSS reacciona al nombre exacto.

**¿Por qué el nombre de una etiqueta propia debe llevar guion?**
Para que nunca choque con una etiqueta oficial. HTML no define ni definirá etiquetas
con guion, así que `<boton-app>` queda reservado para componentes propios. Sin esa
regla, una etiqueta futura del estándar podría romper los componentes existentes.

## Ejercicio 2: tarjeta de producto

**¿Por qué los atributos se convierten a número?**
Un atributo siempre llega como texto. Con `Number(...)` se puede comparar
`existencia === 0` y dar formato de pesos al precio. Sin la conversión, `"0" === 0`
es falso y la tarjeta nunca saldría como agotada.

**¿Por qué un solo listener en la rejilla?**
El evento `agregar` tiene `bubbles: true`, así que sube desde cada tarjeta hasta
`#rejilla`. Un solo listener atiende las doce tarjetas.

**¿Qué pasó al quitar `composed: true`?**
Con el código original no cambió nada: el evento se lanza con `this.dispatchEvent`,
desde la propia etiqueta `<tarjeta-producto>`, que está en el DOM normal, así que
`bubbles` basta. Al lanzarlo desde un elemento dentro del Shadow DOM, sin `composed`
el evento quedó atrapado: el contador no se movió y no hubo ningún error.
`bubbles` hace que el evento suba; `composed` le permite cruzar la frontera de la sombra.

**Las tres partes del contrato del componente**
- Lo que recibe: los atributos (`nombre`, `precio`, `imagen`, `existencia`).
- Lo que avisa hacia afuera: el evento `agregar`, con id, nombre y precio.
- Lo que nadie más puede tocar: el Shadow DOM, con su HTML y su CSS privados.

