const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "database-1.chu8s4mcy1zn.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "doomsday",
    database: "Map",
});

connection.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })
module.exports = connection