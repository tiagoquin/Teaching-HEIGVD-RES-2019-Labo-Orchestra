/**
 * @fileOverview Implementation of the Musician class
 * @author  Tiago Póvoa
 */

const uuid = require('uuid');
const dgram = require('dgram');

const INSTRUMENTS = require('./protocol/instruments');
const protocol = require('./protocol/orchestra-protocol')

// We create the udp socket
const s = dgram.createSocket('udp4');


/**
 * @class class Musician
 * @property {string} instrument -
 * @property {string} sound -
 * @property {uuid} id -
 */
class Musician {
  /**
   * @constructor
   * @param {string} instrument - instrument the instrument we wish to play
   */
  constructor(instrument) {
    if (!INSTRUMENTS.has(instrument)) {
      throw Error(`${instrument} doesn't exist`);
    }

    /** @private */ this.instrument = instrument;

    /** @private */ this.sound = INSTRUMENTS.get(this.instrument);

    /** @private */ this.uuid = uuid();
  }

  /**
   * This method send an udp datagram with the musician object (Jsonify)
   */
  play() {
    const payload = JSON.stringify(this);
    const message = Buffer.from(payload); // new Buffer is deprecated

    s.send(message, 0, message.length,
      protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
      (err, bytes) => {
        console.log(`Sending payload: ${payload} via port ${s.address().port}`);
      });
  }
}

module.exports = Musician;
