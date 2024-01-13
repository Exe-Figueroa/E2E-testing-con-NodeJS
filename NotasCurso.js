/** 02-Explorando la API
 * *Se corren migraciones
 * *Se configuran los contenedores de docker
 * *Se recorre la API desde insomnia
 *  ?Creación de usuario, categorías y productos
 */

/** 03-Instalando Jest
 * *Instalar jest
 * *Configurar package.json con el script de jest
 * *Agregar archivo de configuración de jest en la raiz
 * *Crear carpeta e2e para guardar los test ahí
 * *Se le agrega un comando --verbose para que los test sean más explícitos
 */

/** 05-Tu primer prueba e2e
 * *Vamos a hacer solicitudes a la api utilizando supertest y luego vamos a checkear si las respuestas son las esperadas o no
 * *Instalar supertest
 * *Crear una api con un endpoint
 * *Utilizar supertest para realizar consultas a esa api y comprobar los valores que devuelve
 */

/** 06-Buenas prácticas en pruebas e2e
 * *Se corrigen los procesos asíncronos dándoles como tiempo de vida solo el momento en el que se van a ejecutar las pruebas
 */

/** 07-Configurando el entorno de pruebas para nuestro proyecto
 * *crear un archivo app con una función para levantar el servidor
 * *Luego utilizar la función para levantar el servidor en cada prueba
 */


/** 08-Coverage Report (Reporte de cobertura)
 * *Para saber qué pruebas corren hacia qué puerto
 * * Guía para cubrir los flujos a los que le faltan pruebas
 * *Agregar flag para los reportes en el package json
 *
 */

/** 09-Pruebas a los schemas o dtos
 * *Creamos un archivo por ruta básicamente y en cada archivo hay que testear las rutas de cada servicio
 * *Trabajamos en la ruta de usuarios para verificar que la api no inyecte valores no válidos en la db
 *  ?Enviamos mal el mail y el usuario para que esta nos devuelva un 400 y un mensaje
 */

/** 10-Pruebas a endpoints GET
 * *Realizamos pruebas
 * *Para que sean más precisas nos traemos a sequelize y empezamos a realizar pruebas con sus modelos
 *  ?Así verificamos que realmente se conectó a la db
 */

/** 11-Pruebas al Login
 * *Se le hacen solicitudes a la ruta de login
 * *Se prueban devoluciones de errores en caso de que se envíen usuarios inexistentes
 * *Se prueban usuarios sin contraseña en caso de que se envíe información correcta
 */

/** 12-Pruebas a rutas con protección>
 * *Se le coloca la función set() al get de la api para poder enviar headers
 * *Se verifica si los códigos de las consultas funcionan en base a la api_key enviada
 */

/** 13-Pruebas a rutas con accessToken
 * *Se crea un nuevo archivo de test para la ruta de profile para verificar el perfil del usuario con el acces token enviado
 * *Se crean los test para la ruta y se define queantes de todos los test se va a loguear el usuario
 *  ?Esto es con el fin de conseguir el access token
 * *Luego se hacen las pruebas necesarias
*/

/** 14-Pruebas a endpoints POST
 *  *Básicamente se crea el test que había faltado. Enviar un usuario a una db y compararlo con la solicitud directa a la db con sequelize
 * *Hay que crear una db que no guarde los datos que son de pruebas
 */

/** 15-¿Crear bases de datos solo para pruebas?
 * *Cada prueba debería tener su escenario de datos sin que este influya en las posteriores
 * *Rule 1=> No se debe probar con la DB de producción
 * *Rule 2=> No se debe usar la DB de desarrollo
 * *Rule 3=> Evitar crear datos de forma manual
 * *Rule 4=> Tener un escenario de datos replicable
 * *Para evitar que las pruebas se pisen creamos un dataSet para ejecutar las pruebas
 * *Antes y después de cada prueba se crean y se eliminan los datos creados
 */

/** 16-Preparando el ambiente de pruebas e2e
 * *Creamos una configuración para levantar una db de prueba
 * *En dicha db no deben persistir los datos
 * *Luego configuramos el archivo config para que lea las variables de .env o .env.e2e según la node_env
 * *Luego creamos el script para insertar el valor de e2e en la var de entorno cuando se ejecuten pruebas de testeo
 */

/** 17-Creando un seed de datos manual
 * *Creamos una carpeta utils para nuestro seed.js
 * *Dentro del seed creamos una función para levantar las semillas y otra para bajarlas
 * *Nos importamos a sequelize y también extraemos los modelos de sequelize
 * *Dentro de la función para levantar las semillas sincronizamos la info
 *  ?Lo hacemos para crear en e2e una estructura de la tabla sin necesidad de correr migraciones con un comando
 * *Se llama a la función para levantar la semilla y se la coloca en el beforeAll de los test para levantar la db
 */

/** 18-Seed de datos con sequelize
* *Se crea una carpeta seeders en donde se le van a colocar las semillas de sequelize
 * *Se crea la semilla para users
 * *Los seeds se corren en orden según el número que tengan al principio
 * *Se crean seed para categorias y productos
 * *Se crea un comando para correr los seeds con el cli de sequelize
 *  ?Uno para subirlos y el otro para revertirlos
 */

/** 19-Umzug: corriendo los seeds de datos para pruebas e2e
 * *Es para poder correr los comandos npm run seed:all y npm run seed:undo de manera programática
 * *Se configura el up de umzug y el down. Le decimos que corra los seeder y además le colocamos una configuración para poder enviarle el contexto a las semillas
 * *Luego reemplazamos el import del seed manual y colocamos la ruta de umzug.
 *  ?Como las funciones tienen el mismo nombre y los archivos están en el mismo scope solo cambiamos el nombre de seed por umzug para importar las funciones
 */

/** 20-Pruebas a crear categorías
 * *Hacemos login de un user para obtener el token y con ese token probamos crear categorías
 * *Hacemos pruebas al endpoint para ver si falla (Sin enviar un token)
 * *Hacemos pruebas enviando un token de customer user para validar si falla
 */

/** 21-Pruebas al endpoint de productos
 * *Se crean las pruebas para traer 1 producto y se compara con el de la db
 * *se hace lo mismo pero con varios productos
 * *Se comprueba que la categoría sea la misma
 * *Post a products
 */

/** 22-Pruebas a la paginación
 * *Se prueba el get a la paginación cuando este lleva los query parameters de limit y offset
 * *Se prueba que al traer datos paginados estos no superen el límite impuesto
 */

/** 23-Mocking en NodeJS
 * *Consiste en hacerle mocking a servicios externos a nuestro proyecto (APIs, Dependencias, etc)
 * *En este caso tenemos que hacer mocking de nodemailer
 * *Primero se genera el mock con la configuracion necesaria
 *  ?Se le coloca las funciones que va a simular y que va a espiar.
 * *Luego se hace una limpieza de los mocks para evitar comportamientos indeseados
 * *Se crea la prueba para la ruta y se le dice al mock que resuelva una promesa en true
 * *Se verifica el msj de la solicitud
 * *Y finalmente se verifica si dicha función que espiaba el mock fue llamada al menos una vez para corroborar que el código no falla
 */

/** 24-Automatización en GitHub Actions
 * *Se hace con el fin de que cada vez que hayan cambios en el repo se corran las pruebas de manera automática
 *  ?Esto es debido a que cuando desplegamos nuestra app no tenemos manera de correr los tests
 */

