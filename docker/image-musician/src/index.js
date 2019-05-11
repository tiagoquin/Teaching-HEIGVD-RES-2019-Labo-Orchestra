/**
 * @fileOverview Entrypoint of this node app.
 * We create a musician with an instrument passed in argument
 * then we set an interval to make it repeat indefinitely.
 * @author  Tiago Póvoa
 */

const Musician = require('./musician');


const instrument = process.argv[2];

const musician = new Musician(instrument);

// Here the .bind() let us call `this` inside the play function
setInterval(musician.play.bind(musician), 5000);
