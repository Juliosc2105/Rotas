const express = require ("express")

const app = express()

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css')
})

app.get('/teste.js', function(req, res){
    res.sendFile(__dirname + '/teste.js')
})

app.get('/script.js', function(req, res){
    res.sendFile(__dirname + '/script.js')
})


app.listen(3000)
console.log("Servido aberto, Link: localhost:3000")