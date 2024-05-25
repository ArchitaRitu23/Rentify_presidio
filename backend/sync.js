const connection = require("./connection")

connection.sync()
.then(() => console.log("tables created"))
.catch(err => console.log(err))