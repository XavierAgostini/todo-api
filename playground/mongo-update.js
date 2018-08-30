const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server')

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5b8734419cde5ebba419c11a")
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5b87232f59219651d6620d91")
  }, {
    $set: {
      name: 'Green Hornet'
    },
    $inc: {
      age: 100
    } 
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })
  
  db.close()
})
