1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?
No hizo falta una base de datos real porque se puede probar la regla usando el repositorio en memoria porque el Service no depende de como se guardan los datos sino de las operaciones que ofrece el Repository y esto tambien demuestra que el patron Repository sirve para separar la logica del negocio de la forma en que se almacenan los datos.

2. El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?
Si el Service recibiera directamente InMemoryPrestamoRepository quedaría ligado a esa implementacion y si despues quisieramos usar una base de datos real pues tendria que modificar el Service y ademas seria mas dificil hacer pruebas con otras implementaciones del repositorio. 

3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?
Pues principalmente cambiaria la implementacion del repositorio y la parte donde se crea el repositorio en main.ts porque el Service, los dto y las entidades no tendrian que cambiar porque dependen de la interfaz del Repository y no de como se almacenan los datos y por eso el cambio seria pequeño.