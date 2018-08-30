const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server')

  // db.collection('Todos').deleteMany({completed: false}).then((result) => {
  //   console.log(result)
  // })

  // db.collection('Todos').deleteOne({completed:true}).then((result) => {
  //   console.log(result)
  // })
  // db.collection('Todos').findOneAndDelete({completed:true}).then((result) => {
  //   console.log(result)
  // })
  db.collection('Users').deleteMany({name: 'Bob Dole'}).then((result) => {
    console.log(result)
  })
  db.collection('Users').findOneAndDelete({_id: new ObjectID("5b872336019d3951dd0ce61d")}).then((result) => {
    console.log(result)
  })
  db.close()
})