const http = require('http'); //generally we name the object with module name

//const { PassThrough } = require('stream');
const routes = require('./routes.js')

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

/*const server = http.createServer((req,res) => {   //createServer returns a server so we need to store it in a var
    
    

   
});*/

const server = http.createServer(routes.handler);

console.log(routes.someText);





server.listen(3000); //Now server will start/keep listening. In production it will use default port 80. 
                     //Defult host will be localhost


