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

//Esquema de validaciones
const anotacionSchema = Joi.object({
  name: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  libreta: Joi.string().trim().required()
});

const libretaSchema = Joi.object({
  name: Joi.string().trim().required(),
  accesToken: Joi.string().trim().required()
});

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
app.get('/anotaciones', async (req, res) => {
  try {
    const items = await anotaciones.find({});
    res.json(items);
  } catch (error) {
  }
})

//Insertar una anotacion
app.post('/anotacion', async (req, res) => {
  try {
    const value = await anotacionSchema.validateAsync(req.body);
    const inserted = await anotaciones.insert(value);
    res.json(inserted);
  } catch (error) {
  }
})

app.put('/anotacion', (req, res) => {
  res.send('Has modificado una anotación')
})

app.delete('/anotacion', (req, res) => {
  res.send('Has eliminado una anotación')
})

app.listen(port, () => {
  console.log(`App escuchando desde http://localhost:${port} >_>`)

})