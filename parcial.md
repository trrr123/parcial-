# Parcial - Cars & Tuition

En esta actividad se realizó el CRUD completo de las tablas Cars y Tuition, utilizando Node.js, TypeScript, Sequelize y MySQL como motor de base de datos. Se siguió un ciclo ordenado de desarrollo que va desde la creación de la base de datos hasta la prueba de cada endpoint.

---

## 1. Base de Datos

Se creó la base de datos `parcial` en MySQL corriendo dentro de un contenedor Docker desde la terminal de Ubuntu. Se utilizó el contenedor `mysql-colegio` que corre en el puerto 3307.

```bash
docker exec -it mysql-colegio mysql -u root -p123456789 -e "CREATE DATABASE IF NOT EXISTS parcial;"
```

![creacion_bd](./imagenes/creaciondebasededatosubuntu.png)

---

## 2. Archivos de Configuración Inicial

Antes de crear los modelos se configuraron los archivos base del proyecto. Estos archivos definen las dependencias, la configuración de TypeScript, las variables de entorno y la conexión a la base de datos.

### package.json
Se definieron todas las dependencias del proyecto incluyendo express, sequelize, mysql2, faker y typescript entre otros.

![packaje_json](./imagenes/packaje_json.png)

### tsconfig.json
Se configuró TypeScript con target ES2020 y módulo commonjs para compatibilidad con Node.js.

![tsconfig](./imagenes/tsconfig.png)

### .env
Se definieron las variables de entorno para la conexión a MySQL incluyendo host, puerto, usuario, contraseña y nombre de la base de datos.

![env](./imagenes/env.png)

### db.ts
Se configuró la conexión a MySQL usando Sequelize. Este archivo exporta la instancia de Sequelize y una función `testConnection` para verificar la conexión.

![db_ts](./imagenes/db_ts.png)

---

## 3. Modelos con Validaciones

Se crearon los modelos de Sequelize para cada tabla con sus respectivas validaciones. Cada modelo define la estructura de la tabla, los tipos de datos y las reglas de validación que se aplican antes de insertar o actualizar un registro.

### Car.ts
El modelo Car define los campos marca, clase, modelo, cilindraje y capacidad. Cada campo tiene validaciones como `notEmpty`, `notNull`, `isInt` y valores mínimos para garantizar la integridad de los datos.

![car_modelo](./imagenes/modelo_cars.png)

### Tuition.ts
El modelo Tuition define los campos date, ciudad, pago y car_id como llave foránea hacia la tabla cars. La relación es de 1 a N, es decir un carro puede tener muchas matrículas.

![tuition_modelo](./imagenes/modelo_tuition.png)

---

## 4. Controladores

Se crearon los controladores para cada modelo. Cada controlador contiene los métodos necesarios para realizar las operaciones CRUD: obtener todos, obtener por ID, crear, actualizar y eliminar.

### car.controller.ts
Contiene los métodos `getCars`, `getCarById`, `createCar`, `updateCar` y `deleteCar`. Cada método maneja errores con try/catch y retorna respuestas HTTP apropiadas.

![car_controller](./imagenes/controllers_car.png)

### tuition.controller.ts
Contiene los métodos `getTuitions`, `getTuitionById`, `createTuition`, `updateTuition` y `deleteTuition`. Sigue el mismo patrón del controlador de cars.

![tuition_controller](./imagenes/controllers_tuition.png)

---

## 5. Rutas

Se crearon los archivos de rutas para cada modelo. Las rutas definen los endpoints de la API REST y asocian cada método HTTP con su respectivo controlador.

### car.routes.ts
Define los endpoints GET, POST, PUT y DELETE para la tabla cars bajo la ruta `/api/cars`.

![car_routes](./imagenes/route_car.png)

### tuition.routes.ts
Define los endpoints GET, POST, PUT y DELETE para la tabla tuition bajo la ruta `/api/tuitions`.

![tuition_routes](./imagenes/route_tuition.png)

---

## 6. Index, Rutas y Config

Se configuró el servidor Express en el archivo `config/index.ts` registrando todas las rutas, middlewares y la conexión a la base de datos. El archivo `index.ts` es el punto de entrada de la aplicación.

### index.ts
Punto de entrada de la aplicación. Instancia la clase App y llama al método listen para iniciar el servidor.

![index](./imagenes/index_ts.png)

### config/index.ts
Clase principal que configura Express, registra los middlewares (morgan, cors, express.json), define las rutas y establece la conexión con la base de datos mediante Sequelize.

![config](./imagenes/configindex_ts.png)

---

## 7. Creación Tabla Física

Se ejecutó el servidor con `npm run dev` para que Sequelize sincronizara los modelos con la base de datos y creara las tablas físicamente en MySQL. El comando `sync` se encargó de generar las tablas `cars` y `tuition` con sus respectivas columnas y relaciones.

![npmrundev](./imagenes/npmrundev.png)

---

## 8. Verificación en DBeaver

Una vez creadas las tablas físicamente se verificó en DBeaver que las tablas `cars` y `tuition` existieran correctamente con sus columnas y la llave foránea `car_id` en la tabla tuition apuntando a la tabla cars.

![dbeaver_cars](./imagenes/sereflejaendbeaver1.png)
![dbeaver_tuition](./imagenes/sereflejaendveaber2.png)

---

## 9. Faker - 20 Registros por Tabla

Se creó el script faker para poblar la base de datos con datos de prueba. El script inserta 20 registros en la tabla cars con marcas, clases, modelos, cilindrajes y capacidades aleatorias, y luego 20 registros en la tabla tuition con fechas, ciudades, pagos y referencias a carros existentes.

### Script Faker
El script primero limpia las tablas para evitar duplicados y luego inserta los registros usando `bulkCreate`.

![faker_script](./imagenes/faker_ts.png)

### Ejecución Exitosa
Se ejecutó `npm run faker` y se verificó que los 20 registros por tabla se insertaron correctamente sin errores.

![faker_exitoso](./imagenes/npmrunfaker.png)

### Datos Cars en DBeaver
Se verificó en DBeaver que los 20 registros de la tabla cars se insertaron correctamente.

![datosfaker_cars](./imagenes/fakercarsdbeaver.png)

### Datos Tuition en DBeaver
Se verificó en DBeaver que los 20 registros de la tabla tuition se insertaron correctamente con sus referencias a la tabla cars.

![datosfaker_tuition](./imagenes/fakertutiondbeaver.png)

---

## 10. HTTP - Prueba de CRUD por Tabla

Se crearon los archivos HTTP para probar cada endpoint usando la extensión REST Client de VS Code. Se probaron todas las operaciones CRUD para cada tabla y se verificó en DBeaver que los cambios se reflejaran correctamente.

### Archivos HTTP creados

#### cars.http
Archivo con todas las peticiones HTTP para probar el CRUD de la tabla cars.

![cars_http](./imagenes/cars_http.png)

#### tuition.http
Archivo con todas las peticiones HTTP para probar el CRUD de la tabla tuition.

![tuition_http](./imagenes/tuition_http.png)

---

### Cars

#### GET - Obtener todos los carros
Se realizó una petición GET a `/api/cars` y se obtuvo la lista completa de carros almacenados en la base de datos.

![cars_get](./imagenes/get.png)

#### GET - Obtener carro por ID
Se realizó una petición GET a `/api/cars/1` y se obtuvo el carro con el ID especificado.

![cars_getid](./imagenes/getid.png)

#### POST - Crear carro
Se realizó una petición POST a `/api/cars` con los datos del nuevo carro en el body y se obtuvo el registro creado con su ID asignado.

![cars_post](./imagenes/post.png)

#### POST verificado en DBeaver
Se verificó en DBeaver que el nuevo carro creado apareció correctamente en la tabla cars.

![cars_post_dbeaver](./imagenes/postdbeaver.png)

#### PUT - Actualizar carro
Se realizó una petición PUT a `/api/cars/1` con los datos actualizados y se obtuvo el registro modificado.

![cars_put](./imagenes/put.png)

#### PUT verificado en DBeaver
Se verificó en DBeaver que los datos del carro se actualizaron correctamente en la tabla.

![cars_put_dbeaver](./imagenes/putdbeaverid1.png)

#### DELETE - Eliminar carro
Se realizó una petición DELETE a `/api/cars/1` y se eliminó el registro de la base de datos.

![cars_delete](./imagenes/delete.png)

#### DELETE verificado en DBeaver
Se verificó en DBeaver que el carro fue eliminado correctamente de la tabla cars.

![cars_delete_dbeaver](./imagenes/deletedbeaver.png)

---

### Tuition

#### GET - Obtener todas las matrículas
Se realizó una petición GET a `/api/tuitions` y se obtuvo la lista completa de matrículas con sus referencias a los carros.

![tuition_getid](./imagenes/getidtuituion.png)

#### POST - Crear matrícula
Se realizó una petición POST a `/api/tuitions` con los datos de la nueva matrícula incluyendo el car_id del carro asociado.

![tuition_post](./imagenes/posttuition.png)

#### POST verificado en DBeaver
Se verificó en DBeaver que la nueva matrícula apareció correctamente en la tabla tuition con su referencia al carro.

![tuition_post_dbeaver](./imagenes/postdbeavertuition.png)

#### PUT - Actualizar matrícula
Se realizó una petición PUT a `/api/tuitions/1` con los datos actualizados de la matrícula.

![tuition_put](./imagenes/puttuition.png)

#### PUT verificado en DBeaver
Se verificó en DBeaver que los datos de la matrícula se actualizaron correctamente.

![tuition_put_dbeaver](./imagenes/putdbeavertuition.png)

#### DELETE - Eliminar matrícula
Se realizó una petición DELETE a `/api/tuitions/1` y se eliminó el registro de la base de datos.

![tuition_delete](./imagenes/deletetuition.png)

#### DELETE verificado en DBeaver
Se verificó en DBeaver que la matrícula fue eliminada correctamente de la tabla tuition.

![tuition_delete_dbeaver](./imagenes/deletedbeavertuition.png)
