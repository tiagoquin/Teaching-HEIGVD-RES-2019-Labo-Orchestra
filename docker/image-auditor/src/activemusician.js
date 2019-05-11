/**
 * @fileOverview Implementation of the ActiveMusician class
 * @author  Tiago Póvoa
 */

const INSTRUMENTS = require('./protocol/instruments');


/**
 * @class ActiveMusician
 * @property {string} instrument -
 * @property {string} date -
 */
class ActiveMusician {
  /**
   * @constructor
   * @param {string} instrument - instrument the instrument we wish to play
   */
  constructor(instrument, date) {
    if (!INSTRUMENTS.has(instrument)) {
      throw Error(`${instrument} doesn't exist`);
    }

    this.instrument = instrument;
    this.activeSince = date;
  }
}

module.exports = ActiveMusician;
