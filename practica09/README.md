## Respuestas de la práctica

**1. ¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?**
Ninguna. Solo cambió el `useClass` en `clases.module.ts`, de `ClaseMemoriaRepository`
a `ClasePrismaRepository`. El Service depende del token `CLASE_REPOSITORY` y de la
interfaz `ClaseRepository`, no de una clase concreta.

**2. ¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?**
Porque depende de la interfaz `InscripcionRepository` y las reglas solo usan los métodos
del contrato (`buscarPorHorario`, `buscarHorario`, `buscarMiembro`, `guardar`). El
repositorio de Prisma cumple el mismo contrato; solo cambia dónde se guardan los datos.

**3. ¿Por qué una interfaz no puede validar nada en tiempo de ejecución?**
Las interfaces de TypeScript solo existen al compilar y desaparecen en el JavaScript
resultante. Una clase sí sobrevive y puede llevar decoradores, que guardan metadatos que
`class-validator` lee al ejecutar. Por eso en los controladores el DTO debe importarse
sin `import type`.

**4. ¿Qué código de estado responde la validación y qué trae en el cuerpo?**
Responde 400 Bad Request. El cuerpo trae `statusCode`, `error: "Bad Request"` y
`message`, un arreglo con un texto por cada regla incumplida (por ejemplo
`horarioId must be an integer number` o `property color should not exist`).

**5. ¿Cuántas líneas quedó más corto el controlador?**
`inscripciones.controller.ts` pasó de 81 a 55 líneas: 26 líneas menos. Se eliminaron
el `try/catch`, la validación manual y los imports de errores.

**6. Si la respuesta llega en los dos casos, ¿quién bloquea realmente y a quién protege?**
Bloquea el navegador, no el servidor. El servidor responde igual y solo omite
`Access-Control-Allow-Origin` si el origen no está permitido; el navegador, al no
encontrarla, impide que el JavaScript de la página lea la respuesta. Protege al usuario
de que un sitio malicioso use su sesión para leer datos de otra API. No protege a la API
de clientes que no son navegadores (curl, Postman).

