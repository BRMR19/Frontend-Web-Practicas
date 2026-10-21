## Respuestas de la práctica

**1. ¿Por qué el paquete del adaptador se llama adapter-mariadb si usamos MySQL?**
MySQL y MariaDB hablan el mismo protocolo de red y MariaDB nació como un fork de MySQL.
El driver de `mariadb` para Node.js sirve para ambos, así que Prisma usa un solo adaptador
(`@prisma/adapter-mariadb`) para conectarse a cualquiera de los dos.

**2. ¿Editar schema.prisma cambió algo en la base de datos antes de migrar?**
No. `schema.prisma` es solo un archivo de texto con la descripción deseada del esquema.
La base de datos solo cambia cuando se ejecuta `prisma migrate dev`, que genera el `.sql`
y lo aplica.

**3. ¿La carpeta de migraciones es una foto del esquema o un historial?**
Es un historial. Cada cambio queda como una carpeta nueva con su propio `.sql`
(en mi caso hay 5), y la base se reconstruye aplicándolos en orden. Por eso agregar
`descripcion` generó un `ALTER TABLE` y no un `CREATE TABLE` nuevo.

**4. ¿Por qué Horario.clase sí crea columna y Clase.horarios no?**
Porque `Horario.clase` lleva `@relation(fields: [claseId], references: [id])`, que declara
qué campo guarda la llave foránea. `Clase.horarios` es solo el lado inverso (`Horario[]`):
un campo virtual para navegar la relación en el cliente, sin columna en `clases`.
La llave foránea siempre vive del lado "muchos".

**5. ¿De dónde sale la relación de muchos a muchos entre Miembro y Horario?**
De la tabla `inscripciones`, que tiene dos relaciones uno a muchos: una hacia `Horario`
y otra hacia `Miembro`. Una tabla intermedia con dos llaves foráneas es la forma de
representar un muchos a muchos en una base relacional, por eso no hizo falta declararlo.
Además guarda datos propios (`estado`, `creadaEn`).
