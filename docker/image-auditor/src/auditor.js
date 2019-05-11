/**
 * @fileOverview Implementation of the Auditor class
 * @author  Tiago Póvoa
 */


/**
 * @class Auditor
 */
class Auditor {
  constructor() {
    this.musicians = new Map([]);
  }

  addMusician(mUuid, musician) {
    this.musicians.set(mUuid, musician);
  }

  checkInactivity() {
    const now = new Date();

    this.musicians.forEach((value, key, map) => {
      if (now.getTime() - value.activeSince.getTime() > 5000) {
        map.delete(key);
      }
    });
  }

  musicianList() {
    const array = []
    this.musicians.forEach((value) => {
      array.push(value);
    });

    return array;
  }
}

module.exports = Auditor;
