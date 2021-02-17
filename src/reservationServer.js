const http = require('http');
const config = require('../config');
const dataProcessing = require('../services/dataProcessing');
const url = require('url');
//const User = require('../models/user').User;

const server = http.createServer();
server.on('request', (request, response) => {

    console.log("request.method: " + request.method);
    console.log("request.url: " + request.url);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Method', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, x-cache-header');

    const cipherKeyValue = request.headers['x-cache-header'];
    if(request.method != 'OPTIONS' && cipherKeyValue != 'f6b2507a6a3f') {
        response.writeHead(200);
        response.end('OK');
        return;
    }

    if (request.method == 'OPTIONS') {
        response.writeHead(200);
        response.end('OK');
    } else if (request.url == "/api/reserved" && request.method == 'POST') { 
        var body = '';
        request.on('data', function(data) {
            body += data;
        })
        .on('end', function() {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log("body Error- " + body + ' - Error message:' + e);
                response.statusCode = 400;
                response.end('Bad request!');
                return;
            }
            console.log("body - " + body.nameUser);
            console.log("body - " + body.phoneNumber);

            /*let user = new User({
                username: body.nameUser,
                numberphone: body.phoneNumber
            });*/

            //user.save().then(() => console.log('SAVE in db'));
            dataProcessing.saveReservationData(body);
            response.end('ok');
        });
    } else if (request.url.indexOf("/api/reservedinfo") > -1 && request.method == 'GET') { 
        console.log("Work get request");
        let urlRequest = url.parse(request.url, true);
        console.log("GET Params1: " + urlRequest.query.fromTime); // ! GET Params
        console.log("GET Params2: " + urlRequest.query.toTime); // ! GET Params
        dataProcessing.getListReservedTables(urlRequest.query.fromTime, urlRequest.query.toTime, function(db) {
            response.setHeader( "Content-Type", "application/json");
            response.writeHead(200);
            console.log("JSON: " + JSON.stringify(db)); 
            response.end(JSON.stringify(db));
        });
    } else {
        response.setHeader( "Content-Type", "text/html");
        response.writeHead(404);
        response.write("<h2>404</h2>");
        response.end('Page not found, sorry!');
    } 
});
server.listen(config.get('port'), 'localhost', () => { console.log("Start Node server!") });