const mysql = require('mysql2'); 

//init database if not exist
const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}); 

connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_BASE}`, (err, result) => {
    err ? console.log(err) : console.log("Database ready");
});
connection.changeUser({ database: process.env.DB_BASE }, (err) => {
    if(err){
        console.log('error to change database', err);
        return;
    }
})
//Connecting to database
connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    initDB();
}); 

function createTable(query) {
    db.query(query, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
    });
}

function initDB() {
    const articles = `
        CREATE TABLE IF NOT EXISTS articles (
            id         INT(6)       NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title      VARCHAR(100) NOT NULL,
            nickname   VARCHAR(100) NOT NULL,
            content    TEXT         NOT NULL,
            createAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
        )
    `;
    const comments = `
        CREATE TABLE IF NOT EXISTS comments (
            id         INT(6)       NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nickname   VARCHAR(100) NOT NULL ,
            content    TEXT         NOT NULL,
            createAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
            aId        INT(6)       NOT NULL,
            cId        INT(6)       DEFAULT NULL
        )
    `;
    createTable(articles);
    createTable(comments);
}

module.exports = connection;