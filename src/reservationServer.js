const http = require('http');

const server = http.createServer();
server.on('request', (request, response) => {

    console.log("request.method: " + request.method);
    console.log("request.url: " + request.url);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Method', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

   if (request.method == 'OPTIONS') {
        response.writeHead(200);
        response.end('OK');
    } else if (request.url == "/api/reserved" && request.method == 'POST') { 
        var body = '';
        request.on('data', function(data) {
            body += data;
        })
        .on('end', function() {
            try{
                body = JSON.parse(body);
            } catch (e) {
                console.log("body Error- " + body + ' - Error message:' + e);
                response.statusCode = 400;
                response.end('Bad request!');
                return;
            }
            console.log("body - " + body.phoneNumber);
            response.end('ok');
        });
    } else {
        response.setHeader( "Content-Type", "text/html");
        response.writeHead(404);
        response.write("<h2>404</h2>");
        response.end('Page not found, sorry!');
    } 
});
server.listen(3070, '127.0.0.1', () => { console.log("Start Node server!") });