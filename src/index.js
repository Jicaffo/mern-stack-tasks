const express = require('express'); // Importa la función express y la guarda dentro de una constante del mismo nombre.
const morgan = require('morgan'); // HTTP request logger middleware for node.js (Muestra petic. de cliente por consola)
const path = require('path'); // Viene con NodeJS. Facilita la manipulación de rutas multiplataforma (Unix/Win).

const app = express(); //Ejecuta la función express (que devuelve un objeto) y lo guarda en una constante "app".


// Db connection
const { mongoose } = require('./database');


// SETTINGS 
// Setea la configuración "port" tomando el puerto de la aplicación del sistema operativo, si no lo tiene usa 3000 por defecto
app.set('port', process.env.PORT || 3000);


// MIDDLEWARES (codigo que se ejecuta con cada petición antes de que llegue a las rutas)
// El método use() del objeto app creado mediante express(), permite montar la/s funcion/es middleware indicadas. Si se ingresa una ruta como primer parámetro, solo se ejecuta de coincidir con ella la ruta de la petición.

// Morgan permite ver por consola las peticiones del cliente. 'dev' es una de las opciones de formato para mostrarlo.
// "GET / 404 3.588ms 139" = Petición "GET" a la url "/", devolvió código "404", demoró 3.588ms, respuesta pesó 139 bytes.
app.use(morgan('dev'));
// Definimos el tipo de datos para la comunicación principal cliente-servidor. Anteriormente se requería un módulo adicional para esto: bodyParser
// Cada vez que llega un dato a nuestro servidor pasa por esta función que comprueba si los datos son JSON.
app.use(express.json());


// ROUTES
// Recibe como argumento en primer lugar la ruta a utilizar y en segundo lugar el objeto router que requerimos desde el archivo task.routes que es el que define los diferentes métodos y subrutas.
app.use('/api/tasks', require('./routes/task.routes'));


// STATIC FILES (decirle a express donde irán los archivos estáticos -los que ve el usuario-)
// Indica a express donde van a estar los archivos estáticos (HTML, CSS y JS finales que el navegador interpretará)
// Utiliza la función static de express (basada en el módulo serve-static de NodeJS) para servir los archivos estáticos.
// Por defecto toma la carpeta public al mismo nivel que el index.js
// Como en este caso está dentro de la carpeta src, se utiliza path para unir __diname (constante de Node que devuelve la ruta del archivo actual "C:/.../src") y la carpeta "public". Node se encarga de poner "/" o "\" para unirlos según S.O.
const staticPath = path.join(__dirname, 'public');
console.log(staticPath);
app.use(express.static(staticPath));


// START SERVER
// Correr el servidor (haciendo que escuche en el puerto que se haya asignado en app)
const PORT = app.get('port');
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
