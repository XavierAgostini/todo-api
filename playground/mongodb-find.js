const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server')

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b87202c97ff7a509e6f5101')
  // }).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('unable to fetch todos', err)
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count:', count)
  // }, (err) => {
  //   console.log('unable to fetch todos', err)
  // })

  db.collection('Users').find({name: 'Bob Dole'}).toArray().then((docs) => {
    console.log('Users')
    console.log(docs)
  }, (err) => {
    console.log('unable to fetch users', err)
  })
  db.close()
})