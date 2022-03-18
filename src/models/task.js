const mongoose = require('mongoose'); // Mongoose se utiliza acá para modelar los datos.
//const mongoose = mongoose; // Desestructuramos el constructor Schema de mongoose

// Schema recibe un objeto cuyas claves son los nombres de los campos, y sus valores objetos con las características de cada campo. Mapea a una colección de MongoDB y define la forma (los datos) de los documentos (registros) dentro de ella.
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// A partir de un Schema podemos crear un modelo, que es el objeto que nos permite representar y manipular la colección  en el resto de la app.
const TaskModel = mongoose.model('TaskModel', TaskSchema);

module.exports = TaskModel;
