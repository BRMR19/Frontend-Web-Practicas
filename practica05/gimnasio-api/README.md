Responder: ¿qué generó el comando nest new?

Genero la estructura inicial de un proyecto NestJS, incluyendo archivos de configuracion, dependencias, modulos, controladores, servicios y archivos necesarios para ejecutar la aplicacion.

Responder: ¿qué hace el AppService que ya viene generado?

El AppService que viene generado contiene el metodo de getHello() que devuelve el texto Hello World y este resultado es utilizado por AppController en la ruta raiz.

Responder: ¿por qué la ruta funciona sin declarar nada en app.module.ts?

Porque el controlador ya esta registrado en AppModule y NestJS reconoce los decoradores  get y post y crea automaticamente las rutas definidas en el AppController.

Responder: ¿qué pasaría si el cuerpo de la petición viniera vacío?

Pues la aplicacion intentaria utilizar cuerpo.nombre, pero recibiria un undefined y como no hay validacion podria agregarse una clase sin nombre valido.

Responder: ¿en qué archivo vive hoy toda la lógica de la práctica?

Pues la logica de la practica esta en el archivo app.controller.ts porque ahi se encuentra todo el arreglo de clases y los metodos para consultar y agregar.