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
