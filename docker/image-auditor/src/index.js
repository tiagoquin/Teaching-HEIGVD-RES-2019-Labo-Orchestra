/**
 * @fileOverview Entrypoint of this node app.
 * We todo this
 * @author  Tiago Póvoa
 */

const dgram = require('dgram');
const net = require('net');

const protocol = require('./protocol/orchestra-protocol');
const ActiveMusician = require('./activemusician');
const Auditor = require('./auditor');

// We need both tcp and udp
const UDP_SOCKET = dgram.createSocket('udp4');
const TCP_SERVER = net.createServer();

// This instance of Auditor will manage the Musicians
const auditor = new Auditor();

// Checking for inactive musicians
setInterval(auditor.checkInactivity.bind(auditor), 1000);

/**
 * @description We bind the udp socket to the multicast address
 */
UDP_SOCKET.bind(protocol.PROTOCOL_PORT, () => {
  console.log(`Joining multicast group ${protocol.PROTOCOL_MULTICAST_ADDRESS}`);
  UDP_SOCKET.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/**
 * @description Every message we intercept, we add the instrument to the auditor
 */
UDP_SOCKET.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  const object = JSON.parse(msg); // todo

  if (auditor.musicians.has(object.uuid)) {
    auditor.musicians.get(object.uuid).activeSince = new Date();
  } else {
    auditor.addMusician(object.uuid,
      new ActiveMusician(object.uuid, object.instrument, new Date()));
  }
});

// -----------

TCP_SERVER.listen(protocol.PROTOCOL_PORT_TCP, () => {
  console.log(`TCP Server starting on port ${protocol.PROTOCOL_PORT_TCP}`, TCP_SERVER.address());
});

TCP_SERVER.on('connection', (socket) => {
  socket.write(JSON.stringify(auditor.musicianList()));
  socket.write('\r\n');

  socket.end();

  console.log(`Socket end on ${socket.remoteAddress} with port: ${socket.remotePort}`);
});
