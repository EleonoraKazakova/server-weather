const express = require('express')
const app = express()

const bodyParcer = require('body-parser')

app.use(bodyParcer.urlencoded({ extended: false }))
app.use(bodyParcer.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('website'))

const port = 8000

const server = app.listen(port, listening)

function listening() {
  console.log('server running')
  console.log(`running on localhost:${port}`)
}

projectData = {
  temperature: '',
  date: '',
  user_response: ''
}

app.get('/data', function (req, res) {
  res.send(projectData)
})

app.post('/', addData)
function addData(req, res) {
  let data = req.body

  projectData['temperature'] = data.temperature
  projectData['date'] = data.date
  projectData['user_response'] = data.user_response

  res.send(projectData)
}