/**
 * @fileOverview
 * @author  Tiago Póvoa
 */

const Musician = require('./musician');


const instrument = process.argv[2];

const musician = new Musician(instrument);

setInterval(musician.play, 5000);
