const http = require('http');

// Paquete necesario para conectar a bases de datos MySQL.
const mysql = require('mysql');
const path = require('path');



const hostname = '127.0.0.1';
const port = 3000;

// Consulta SQL.
var sql = 'SELECT * FROM category LIMIT 10';

// Parámetros de conexión a la base de datos.
const fs = require('fs');

var pass = fs.readFileSync('./password.txt').toString();

var con = mysql.createConnection({
  host: hostname,
  user: "root",
  password: pass,
  database : 'eshop'
});

// Funcion que nos devolverá resultados de la base de datos.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;

    // Bucle que recore los resultados y pinta en consola.
    for(i=0; i<result.length; i++){
    	console.log("Result: " + result[i].name);
    }
  });
});

const server = http.createServer((req, res) => {
  if(req.method == 'GET'){

    let fileurl;
    if(req.url == '/'){
      fileurl = 'index.html';
    }else{
      fileurl = req.url;
    }
    let filepath = path.resolve('./' + fileurl);

    fs.exists(filepath, (exists) => {
      if(!exists){
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(filepath).pipe(res);
    });

  }
}).listen(port);

console.log('Instalación correcta, Hola!');

