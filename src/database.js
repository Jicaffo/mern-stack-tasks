const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-crud-test';

//Hay algun error con la conexión, parecería ser algo de Windows (él utiliza Linux), o de no tener correctamente instalado MongoDB
mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
