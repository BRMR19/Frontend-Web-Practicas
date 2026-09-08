Responder: ¿por qué una unión de valores y no una enumeración?
Se utiliza una union de valores porque perimite definir los estaod validos como activo, devuelto y vencido
sin tener que agregar alguna estructura adicional.

Responder: ¿qué se gana con el tipo desconocido en lugar del que acepta todo?
el tipo desconocido obliga comprobar el tipo del dato antes de utilizarlo y eso hace mas facil de detectar errores
a diferencia del any que permite acceder a propiedades sin comprobaciones y pues eso aumenta el riesgo de errores a diferencia del unknown.

Responder: ¿por qué la fecha entra como parámetro?
La fecha se recibe como parametro para que las funciones no dependan de por ejemplo usar la fecha actual del sistema, lo 
cual se puede traducir a que podemos probar diferentes fechas de manera mas controlada y hacerla mas facil de probar.