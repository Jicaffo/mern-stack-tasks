const express = require('express');
const router = express.Router(); // El método constructor Router crea un objeto de este tipo.

// Task Model (permite acceder a los metodos de Model y sirve además como constructor)
const TaskModel = require('../models/task');

// El objeto router puede crear nuevas rutas mediante un método que indica el verbo get(), post(), etc.
// Recibe como argumentos en primer lugar la ruta a escuchar, y en segundo lugar el manejador típico de eventos de nodeJS: una funcion que define que acciones ejecutar, y obtiene por parámetro el request y el response.
// Define que acciones ejecutar según la subruta y el método de la petición.

// GET all Tasks
router.get('/', async (req, res) => {
   // find() puede contener un objeto que filtre por determinados valores en los campos o un callback (err, result) => {}
   // TODO: Identificar cuando hace falta hacer un .exec() luego del find y cuando no.
  const tasks = await TaskModel.find(); // Tambien se podría pasar un callback como argumento, o usar un .then() luego.
  res.json(tasks);
});

// GET one task by id
router.get('/:id', async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  res.json(task);
});

// ADD a new task
router.post('/', async (req, res) => {
  // req.body dado que lo configuramos en index.js mediante express.json(), va a ser un objeto javascript ya parseado.
  const { title, description } = req.body; 
  // Al crear un nuevo objeto TaskModel se agrega la clave "_id" y "__v" (no entiendo por qué ni que funcion cumple "__v")
  const task = new TaskModel({title, description});
  await task.save(); // Esta línea guarda el nuevo documento/registro en la DB
  res.json({status: 'Task Saved'}); // No termino de entender donde se visualiza esta línea si el navegador no la muestra
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const newTask = {title, description};
  // req.params.id toma los parámetros recibidos por url (indicados por los ":")
  await TaskModel.findByIdAndUpdate(req.params.id, newTask); 
  res.json({status: 'Task Updated'});
});

// DELETE one task by id
router.delete('/:id', async (req, res) => {
  await TaskModel.findByIdAndRemove(req.params.id);
  res.json({status: 'Task Deleted'});
});

module.exports = router;
