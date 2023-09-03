

const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
  try {
  const mongoClient = await new MongoClient("mongodb://mongo:MkIak5NxzVroNzP5bk0p@containers-us-west-203.railway.app:6164").connect()
  db = mongoClient.db('assignment-11')
  
  req.db = db
  
  next();
}

catch (error) {
  console.log(error, `<=================== error ==================`);
}

}

module.exports = databaseMiddleware