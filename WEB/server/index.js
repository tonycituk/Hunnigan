const express = require('express')
const app = express()
const port = 4000

app.get('/anotaciones', (req, res) => {
  res.send('Aqui están tus anotaciones')
})

app.post('/anotacion', (req, res) => {
  res.send('Has añadido una anotación')
})

app.put('/anotacion', (req, res) => {
  res.send('Has modificado una anotación')
})

app.delete('/anotacion', (req, res) => {
  res.send('Has eliminado una anotación')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})