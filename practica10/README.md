## Respuestas de la práctica

### Parte 1

**¿Por qué el filtro atrapa la clase base y no cada error por separado?**
Con `@Catch(ErrorDeDominio)` un solo filtro cubre los cuatro errores actuales y
cualquier error futuro que extienda la clase base. Se evita repetir el `try/catch`
en cada controlador, y un error nuevo sin mapear cae en 500 para que se note.

**¿Por qué el middleware no podría decidir si un usuario tiene permiso para una ruta?**
Corre antes de que Nest sepa qué controlador y método atenderá la petición, así que
no puede leer metadatos como `@Publico()` o `@Roles()`. Eso lo hace un guard.
(Al comentar `next()`, la petición se quedó cargando sin respuesta y sin error.)

**¿Por qué la petición que responde 409 no aparece en el registro?**
`tap` solo corre cuando el controlador responde bien. Si lanza un error, el flujo
salta al filtro y el interceptor no ve la respuesta.

**¿Por qué el sobre rompe a cualquier cliente que ya usara la API?**
Porque cambia la forma de la respuesta: `res[0]` pasa a ser `res.data[0]`. Un cliente
que leía el arreglo directamente deja de funcionar.

**Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?**
Bloquea el navegador, no el servidor. El servidor responde igual y solo omite
`Access-Control-Allow-Origin` si el origen no está permitido; el navegador, al no
encontrarla, impide que el JavaScript de la página lea la respuesta. Protege al
usuario, no a la API: curl o Postman ignoran CORS.

### Parte 2

**¿Por qué el campo se llama `passwordHash` y no `password`?**
Con ese nombre es imposible guardar la contraseña en claro por descuido: el campo
obliga a guardar solo el hash de bcrypt.

**¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?**
Si dijeran cosas distintas ("correo no existe" y "contraseña incorrecta"), cualquiera
podría averiguar qué correos tienen cuenta probándolos uno por uno.

**Si el contenido del token se puede leer, ¿qué protege la firma?**
Su integridad. El payload solo está codificado en Base64, así que cualquiera lo lee
en jwt.io, pero si alguien lo modifica (por ejemplo `rol: admin`) la firma deja de
coincidir con `JWT_SECRET` y el servidor lo rechaza con 401.

**¿Por qué es más seguro proteger todo y abrir a mano, que al revés?**
Si se olvida marcar una ruta pública, da 401 y el error se nota. Si se olvida
proteger una ruta en el esquema contrario, queda un hueco que nadie ve.

**¿Cuál es la diferencia entre un 401 y un 403?**
401: no sé quién eres (no hay token o es inválido). 403: sé quién eres, pero no tienes
permiso para esta acción.

**¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?**
Ninguna. Solo cambió una línea en `auth.module.ts` (el `useClass`). El AuthService
depende de la interfaz `UsuarioRepository` y no sabe qué hay detrás.

**¿Por qué es importante tomar al usuario de los claims del token y no de la URL o del cuerpo?**
Todo lo que llega en la URL o el cuerpo lo controla el cliente y puede cambiarlo. El
token lo firma el servidor con `JWT_SECRET`, así que si alguien modifica el payload la
firma no coincide. Ejemplo: si la API confiara en `GET /miembros/3/inscripciones`,
Karla podría cambiar el 3 por otro número y ver las inscripciones de otro miembro. Si
aceptara el `miembroId` del cuerpo sin compararlo con el token, Karla podría inscribir
a Sofía. Por eso el controlador compara `usuario.miembroId` (que viene del token)
contra `dto.miembroId`. El claim usado es `miembroId`, junto con `rol`, y el cliente no
puede falsificarlo porque no conoce `JWT_SECRET` y no puede generar una firma válida.

### Tarea: roles

**¿Por qué dos guardias y no uno?**
`JwtAuthGuard` responde "¿quién eres?" (401) y `RolesGuard` responde "¿puedes hacerlo?"
(403). Separarlos permite usar `@Roles()` solo donde hace falta y que el segundo dé por
hecho que `req.user` ya existe.

