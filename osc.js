let oscAddress = '127.0.0.1';
let sendPort = 12006;
let rcvPort = 12005;
let socket;
let oscOn = false;

//initialize OSC listening, connect to node server running bridge.js
function setupOsc(oscPortIn, oscPortOut) {
  socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false }); //connect to node server

  socket.on('connect', function() { //upon connecting initialize osc ports 
    socket.emit('config', { 
      server: { port: oscPortIn,  host: '127.0.0.1'},
      client: { port: oscPortOut, host: '127.0.0.1'}
    });
  });

  socket.on('message', function(msg) { //when a message is received, invoke receiveOSC
    if (msg[0] == '#bundle') {
      for (var i=2; i<msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1)); //separates address and value
    }
  });
}

function receiveOsc(address, value) {
  console.log("received OSC: " + address + ", " + value);
  routeOSC(address,value);
}

function routeOSC (address,value) {
	if (address == '/test') {
    value0 = value[0]; //access value array and do stuff with the data
    value1 = value[1];
  }  
}

function sendOsc(address, value) {
  console.log("sending osc "+value+" to "+address);
  socket.emit('message', [address].concat(value));
}