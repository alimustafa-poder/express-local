import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("CREATE DATABASE IF NOT EXISTS mydb", (err) => {
  if (err) throw err;
  console.log("Database created or already exists");

  // switch to the created database
  con.changeUser({database: "mydb"}, (err) => {
    if (err) throw err;
    console.log("Connected to database");

    // create a table in the database
    const sql = `
          CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          )
        `;
    con.query(sql, (err) => {
      if (err) throw err;
      console.log("Table created or already exists");
    });
  });
});

export default con;
