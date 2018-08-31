const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// var id = '15b8889eed5170772cffca43d'

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('id not found')
//   }
//   console.log('todo', todo)
// }).catch((e) => console.log(e))

var userId = '5b875d10f6154862327979e1'
if (!ObjectID.isValid(userId)) {
  console.log('userId is not valid')
}

User.findById(userId).then((user) => {
  if (!user) {
    console.log('user not found')
  }
  console.log('user', user)
}).catch((e) => console.log(e))