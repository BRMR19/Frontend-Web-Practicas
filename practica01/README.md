Pues el resultado esperado seria 400 
¿hubo algún error, alguna advertencia o algo en la consola que avisara?
Pero en realidad no sumo si no que concateno haciendo que el resultado sea de 35050 pero no salio ningun error 
o algo que avisara que la logica era incorrecta

Responder: si el archivo tiene un error de tipos, ¿por qué node lo ejecuta? ¿Cuál comando revisa y cuál ejecuta?
Porque la comprobación de tipos y la ejecución son diferentes ya que typescript utiliza el compilador tsc para analizar los tipos y detectar errores durante el desarrollo y node se encarga de ejecutar el código y no sustituye al compilador para realizar una comprobación completa de tipos

Responder: de las dos líneas que usan const, ¿por qué sólo una falla? Porque const no protege el contenido sino la variable en si, const no impide modificar el contenido de un objeto solo impide reasignar la variable a un valor distinto


Responder: al asignarle un texto a la variable con let, nadie escribió que fuera un número. ¿De dónde salió ese tipo?
Ese tipo viene de la inferencia de tipos de typescript que aunque no escribimos explícitamente let dias: number el compilador observa el valor con el que se inicializa la variable (let dias = 3;) y como es un número le asigna automáticamente el tipo number a esa variable para siempre

Error 1
error TS2345: Argument of type 'string' is not assignable to parameter of type 'Prestamo'.
Esperaba un objeto de tipo Prestamo
pero recibio un string 
la linea 25

Error 2
error TS2741: Property 'estado' is missing in type '{ multa: number; ejemplar: number; }' but required in type 'Prestamo'.
Esperaba un objeto con todas las propiedades obligatorias de Prestamo
recibio un objeto sin la propiedad estado
linea 27

Error 3
error TS2339: Property 'fechaDevolucion' does not exist on type 'Prestamo'.
Espereba acceder a una propiedad definida en la interfaz de prestamo
pero recibio que el nombre de esa propiedad no existe en la interfaz como tal
Linea 29



