//require is used to access libraries
const http = require('http')
const url = require('url')
const fs = require('fs')
const port =  4000
const express = require("express")
const app = express()

//request and response
//so everytime somebody requests a page in our server, it calls this function
const server = http.createServer(function(req, res) {
    console.log(req.url, req.method)
    res.writeHead(200, {"Content-Type": "text/html"})
    fs.readFile('index.html', function(error, data) {
            if (error) {
                res.writeHead(404)
                res.write("Error: File not found!")
            } else {
                res.write(data)
            }
            res.end()
    })
})

//setup our server so it will listen on the port that we want it to
server.listen(port, function(error)
{
    //if there is an error
    if (error){
        console.log('Something went wrong',error) //pass error so when we check our logs we can see the error
    } else {
        console.log('Server is listening on port ' + port)
    }
})










//expose an endpoint
//receive form fields for the pw generation and then respond with password
//have the html point to the endpont you made

//make 2 paths
//1 for when on the web page
//another for genearting the password (js code)