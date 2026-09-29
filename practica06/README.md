Responder: ¿qué pasaría si el módulo no quedara registrado en la raíz?
Si el modulo no quedara registrado nest no cargaria ese modulo al iniciar la aplicacion.

Responder: ¿por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?
Porque la interfaz esta diseñada para que se represente tambien los repositorios que podrian
trabajar con una base de datos u otra fuente donde las operaciones son asincronas.

Responder: ¿qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola? 
Al cambiar la dependencia de la clase InscripcionMemoriaRepository a la interfaz InscripcionRepository aparecio un error indicando que Nest no podia resolver la dependencia del InscripcionesService.

Responder: ¿por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?
El servicio necesita un token para el repositorio porque depende de una interfaz y las interfaces de typescript no existen en tiempo de ejecucion.

Responder: ¿cuál es la diferencia entre un 400 y un 409?
El 400 Bad Request indica que la solicitud esta mal formada o le faltan datos necesarios y 
el 409 Conflict indica que la solicitud es valida pero entra en conflicto con una regla o con el estado actual del sistema.

Responder: ¿por qué cambió el código de estado de esa última petición?
El codigo de estado cambio porque la inscripcion anterior fue cancelada y al intentar inscribir nuevamente al mismo miembro en el mismo horario la inscripcion cancelada ya no se considera una inscripcion confirmada para validar la regla de duplicidad.


