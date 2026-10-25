# Práctica 12 

**¿En qué se convirtió cada etiqueta del JSX?**
Cada etiqueta es una llamada a función. En el modo clásico, `<div className="tarjeta">`
se convirtió en `React.createElement("div", { className: "tarjeta" }, ...hijos)`: el
tipo, un objeto con las props (o `null` si no hay) y los hijos como argumentos extra.
En el modo automático se convirtió en `_jsx` o `_jsxs`, importadas de
`react/jsx-runtime`, con los hijos dentro de `props.children`. Se usa `_jsxs` cuando
hay varios hijos y `_jsx` cuando hay uno. El texto pasó a ser cadenas.

**Si React es «sólo una biblioteca», ¿quién traduce el JSX?**
Un compilador aparte. En el laboratorio fue SWC; en Vite lo hace un plugin (SWC o
Babel). React solo aporta las funciones a las que apunta el resultado
(`createElement`, `jsx`). El navegador no entiende JSX, por eso la traducción ocurre
antes, durante el build.

**¿Qué hace `createRoot` y qué hace `render`?**
`createRoot(contenedor)` toma el `<div id="root">` y prepara ahí la raíz de React, el
punto donde React controlará el DOM. `render(elemento)` le dice qué dibujar dentro:
convierte el árbol de elementos en nodos reales. Si se llama `render` dos veces sobre
la misma raíz, la segunda reemplaza a la primera.

**¿Por qué el nombre de un componente empieza con mayúscula?**
El compilador distingue por la primera letra. Una etiqueta en minúscula como `<div>` se
traduce a un texto, `createElement('div', ...)`, o sea una etiqueta HTML. Una con
mayúscula como `<Saludo>` se traduce a la variable `Saludo`, y React llama a esa
función. En minúscula, React buscaría una etiqueta HTML llamada `saludo`.

