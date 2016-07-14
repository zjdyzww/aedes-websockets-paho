const fs = require('fs')
const path = require('path')
const colors = require('colors')

const http = require('http')
const wss = require('websocket-stream')
const aedes = require('aedes')()

const index = path.join(__dirname, 'index.html')
const mqttjs = path.join(__dirname, 'mqtt.lib.js')

const server = http.createServer((req, res)  => {

	if(req.url === '/' || req.url === '/index.html') {
		res.writeHead(200, {'Content-Type': 'text/html'})
		fs.createReadStream(index).pipe(res)
	} else if(req.url === '/mqtt.lib.js'){
		res.writeHead(200, {'Content-Type': 'application/javascript'})
		fs.createReadStream(mqttjs).pipe(res)
	}
	
})

const ws = wss.createServer({
	server: server,
}, aedes.handle)

server.listen(9002, () => {
	console.log('Open', 'http://localhost:9002/'.white)
	console.log('Inside developer console, call:', 'sendMessage("Tally-ho!")'.white)
})
