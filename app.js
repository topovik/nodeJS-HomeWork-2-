const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const data = require('./users.json')
const app = express();


const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static(__dirname + ".public"))

app.post('/index', urlencodedParser, (request, response) => {

    const user = {
        username: request.body.UserName,
        mail: request.body.mail,
        comments: request.body.comments
    }
        
    data.users.push(user);
    fs.writeFile('./users.json', JSON.stringify(data), err => {
        if(err) {
            response.send(err)
        }
        else {
            response.redirect("/");
        }
    })
})

app.get('/', (req, res) => {
    fs.readFile('./public/index.html', "utf-8", (error, file) => {
        res.send(file)
    })
});

app.listen(9000);
