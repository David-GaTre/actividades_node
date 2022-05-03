const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    if(req.method == 'GET'){
        let filepath = path.resolve('./index.html');
    
        fs.exists(filepath, (exists) => {
          if(!exists){
            return;
          }
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(filepath).pipe(res);
        });
    }
});
require("./app/routes/category.routes")(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
