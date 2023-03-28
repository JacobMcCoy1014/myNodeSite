var http = require('http');
	fs = require('fs');
var port = 1337;

function serverStaticFile(res, path, contentType, responseCode){
	if (!responseCode){
		responseCode=200;
	}
	
	fs.readFile(__dirname + path, function(err,data){
		if (err){
			res.writeHead(500, {'Content-Type': 'text/plain'});

			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type': contentType});

			res.end(data);
		}
	});
}

http.createServer(function(request, res){
	
	var path = request.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

	switch(path){

	case '':
		serverStaticFile(res, '/public/index.html', 'text/html');
		break;
	case '/css/home.css':
		serverStaticFile(res, '/public/css/home.css', 'text/css');
		break;
	case '/index':
		serverStaticFile(res, '/public/index.html', 'text/html');
		break;
	case '/contact':
		serverStaticFile(res, '/public/contact.html', 'text/html');
		break;
	case '/about':
		serverStaticFile(res, '/public/about.html', 'text/html');
		break;
	case '/service':
		serverStaticFile(res, 'public/service.html', 'text/html');
		break;
	default:
		serverStaticFile(res, '/public/404.html', 'text/html', 404);
		break;
		}
}).listen(port);

console.log("Listening...Go to http://localhost:" + port);