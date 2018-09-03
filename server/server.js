require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

var {mongoose}= require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()

app.use(bodyParser.json())

app.post('/todos', authenticate, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      _creater: req.user._id
    }) 
    const doc = await todo.save()
    res.send(doc)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({
      _creater: req.user._id
    })
    res.send({todos})
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/todos/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }
    const todo = await Todo.findOne({
      _id: id,
      _creater: req.user._id
    })
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  } catch (e) {
    res.status(400).send(e)
  }
})

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }
    const todo = await Todo.findOneAndDelete({
      _id: id,
      _creater: req.user._id
    })
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  } catch (e) {
    res.status(400).send(e)
  }
})

app.patch('/todos/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }
    const todo = await Todo.findOneAndUpdate({
      _id: id,
      _creater: req.user._id,
    }, {$set: body}, {new: true})

    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  } catch (e) {
    res.status(400).send(e)
  }
})

app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body)
    await user.save()
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// app.delete('/users', (req, res) => {
//   User.remove({}).then((user) => {
//     res.send(user)
//   }, (e) => {
//     res.status(404).send(e)
//   })
// })


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password'])
    const user = await User.findByCredentials(body.email, body.password)
    const token = await user.generateAuthToken()  
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.sendStatus(400)
  }
})

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(400)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`started server on port ${process.env.PORT}\n`)
})

module.exports = {
  app
}