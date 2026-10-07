Responder: ¿por qué esta interfaz no menciona Express, NestJS ni memoria?
No la menciona porque pertenece al dominio y solo define las operaciones que necesita el sistema para trabajar con Miembros.

Responder: ¿qué palabra de esa clase es la que promete cumplir la interfaz del paso anterior?
La palabra es implements y esa declaracion indica que la clase se compromete a cumplir la estructura y los metodos definidos por la interfaz MiembroRepository.

Responder: ¿por qué este archivo no sabe qué es una petición HTTP?
Porque su responsabilidad es solo ejecutar las operaciones de la aplicacion sobre los Miembros y solo se comunica con el repositorio mediante la interfaz.

Responder: ¿por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno? 
El Service se inyecta sin token en el Controller porque MiembrosService es una clase concreta decorada con el Injectable y NestJS puede identificarla directamente.

Responder: ¿qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?
Se comprobo que en el endpoint de inscripciones que continua funcionando despues de agregar el modulo de Miembros.




