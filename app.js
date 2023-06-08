const http = require('http'); //generally we name the object with module name
const fs = require('fs');
const { PassThrough } = require('stream');

/*
function rqListener(req,res){

}

//Node will execute rqListener passed as argument whenver a request reaches a server

http.createServer(rqListener); //createServer takes request listener func as argument whcih in turn takes 
                     // two two arguments of type IncomingMessage and ServerResponse

//Also we don't have to create explicit requst listener we can also use aonymous function */

/*
//Node will execute below anonymous function passed as argument whenver a request reaches a server
http.createServer(function(req,res){

});
*/

//We can also use next gen js syntax(arrow function to create server)
//Node will execute below anonymous function passed as argument whenver a request reaches a server

const server = http.createServer((req,res) => {   //createServer returns a server so we need to store it in a var
    
    const url =  req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action = "/message" method="POST"><input type="text" name="msg"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' &&  method === 'POST'){
        const body = []; 
        //on allows us to listen to certain events, again a event listener.
        //listen to data event, data event is fired whenever a new chunk is ready to be read.
        //This is basically helping us with that buffer thing.
        //second argument is a function(ES6 arrow function) that should be executed for every data piece incoming
        req.on('data',(chunk) => {
            //body = 'something'; gives error
            console.log(chunk);
            body.push(chunk);
        }); 

        //end event listener will be triggered once its done parsing the incoming request's data
        //or incoming request in general
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); //we are converting to string because incoming data would be text
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('msg.txt',message);
        });
        
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();

    }
    
    console.log(req.url,req.method,req.headers);

    res.setHeader('Content-Type','text/html'); //setHeader allows us to set new header

    //write allows us to write some data to response and it will be written line by line   
    res.write('<html>');
    res.write('<head><title>My First Page</title></head><body><h1>Hello from my Node.js</h1></body>');
    res.write('</html>');

    //Telling node that we are done with creating response and we are ending it. we should not
    //write anything after end()
    res.end();
    // process.exit(); //hard exits our event loop
});

server.listen(3000); //Now server will start/keep listening. In production it will use default port 80. 
                     //Defult host will be localhost


