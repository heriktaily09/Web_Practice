const fs = require('fs');


const requestHandler = (req,res) => {

    const url = req.url;
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
        return req.on('end', () => {   //we are adding return here to avoid executing the code after this event
            const parsedBody = Buffer.concat(body).toString(); //we are converting to string because incoming data would be text
            const message = parsedBody.split('=')[1];
            fs.writeFile('msg.txt',message,(err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();  
            });
                   
        });
        
        
    
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
};

//module.exports = requestHandler;  exporting single thing

// multipl exports
module.exports = {
    handler : requestHandler,
    someText : "Hello There"
};


/* OR
module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded texts";
*/

/* OR  AN EXPLICIT SHORTCUT SUPPORTED BY NODEJS
exports.handler = requestHandler;
exports.someText = "Some hard coded texts";
*/