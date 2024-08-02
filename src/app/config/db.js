const mysql = require("mysql2");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "moviesdb"
});


db.connect((err) => {
    if(err){
        console.log("Error connectng to mysql database", err);
    }
    else{
        console.log("connected to mysql database");
    }
})

module.exports = db;