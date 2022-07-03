import mongoose from "mongoose";

function connect(userName, password) {
  mongoose.connect(
    `mongodb+srv://${userName}:${password}@nodemongocoursealura.oesvbtv.mongodb.net/NodeMongoCourseAlura`
  );

  let db = mongoose.connection;
  return db;
}

export default connect;
