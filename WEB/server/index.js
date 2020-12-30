//Requires
const express = require('express')
const monk = require('monk')
const Joi = require('joi')
var bodyParser = require('body-parser')
const private = require('./private.js')

//Express app setup
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Esquema de validaciones anotacion
const anotacionSchema = Joi.object({
  name: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  libreta: Joi.string().trim().required()
});

/* //Esquema de validaciones libreta
const libretaSchema = Joi.object({
  name: Joi.string().trim().required(),
  accesToken: Joi.string().trim().required()
}); */

//puerto a usar
const port = process.env.PORT || 4000;

//conexion a la base de datos
const db = monk(private.CONNECTION_STRING);
db.then(() => {
  console.log('Conectado correctamente a la base de datos ʕ•ᴥ•ʔ')
})

//cargar colecciones
const anotaciones = db.get('anotaciones')
const libretas = db.get('libretas')

//Obtener todas las anotaciones
app.get('/anotaciones', async (req, res, next) => {
  try {
    const anotacionesEncontradas = await anotaciones.find({});
    res.json(anotacionesEncontradas);
  } catch (error) {
    next(error)
  }
})

//Obtener una anotacion
app.get('/anotacion/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const anotacionEncontrada = await anotaciones.findOne({
      _id: id,
    });
    if (!anotacionEncontrada) return next();
    return res.json(anotacionEncontrada);
  } catch (error){
    next(error);
  }
})

//Insertar una anotacion
app.post('/anotacion', async (req, res, next) => {
  try {
    var anotacion = req.body;
    const anotacionValidada = await anotacionSchema.validateAsync(anotacion);
    const anotacionInsertada = await anotaciones.insert(anotacionValidada);
    res.json(anotacionInsertada);
  } catch (error) {
    next(error);
  }
})

//Actualizar una anotación 
app.put('/anotacion/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    var anotacionn = req.body;
    const anotacionActualizada = await anotacionSchema.validateAsync(anotacionn);
    const anotacion = await anotaciones.findOne({
      _id: id, 
    });
    if (!anotacion) return next();
    await anotaciones.update({
      _id : id,
    }, {
      $set: anotacionActualizada,
    });
    res.json(anotacionActualizada);
  } catch (error) {
    next(error);
  }
})

//Eliminar una anotación
app.delete('/anotacion/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    await anotaciones.remove({_id: id});
    res.json({
      message: 'Anotación eliminada correctamente'
    })
  }catch (error){
    next(error);
  }
})

/* //Obtener todas las libretas
app.get('/libretas', async (req, res) => {
  res.send();
})

//Insertar una libreta
app.post('/libreta', async (req, res, next) => {
  res.send('Haz insertado una libreta');
})

//Actualizar una libreta
app.put('/libreta', async (req, res, next) => {
  res.send('Haz actulizado una libreta');
})

//Eliminar una libreta
app.delete('/libreta', async (req, res, next) => {
  res.send('Haz actulizado una libreta');
}) */

app.listen(port, () => {
  console.log(`App escuchando desde http://localhost:${port} >_>`)
})