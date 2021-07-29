const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();

app.get('/pw-generation', (req, res) => {
   res.sendFile(path.join(__dirname+'/index.html'));
});

const port =  4000
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


// const server = http.createServer(function(req, res) {
//     console.log(req.url, req.method)
//     res.writeHead(200, {"Content-Type": "text/html"})
//     fs.readFile('index.html', function(error, data) {
//             if (error) {
//                 res.writeHead(404)
//                 res.write("Error: File not found!")
//             } else { 
//                 res.write(data)
//             }
//             res.end()
//     })
// })
// server.listen(port, function(error)
// {
//     //if there is an error
//     if (error){
//         console.log('Something went wrong',error) //pass error so when we check our logs we can see the error
//     } else {
//         console.log('Server is listening on port ' + port)
//     }
// })






//expose an endpoint
//receive form fields for the pw generation and then respond with password
//have the html point to the endpont you made

//make 2 paths
//1 for when on the web page
//another for genearting the password (js code)