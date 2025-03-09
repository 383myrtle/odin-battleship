export class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
  }

  set length(newLength) {
    this._length = newLength;
  }
  get length() {
    return this._length;
  }

  set numHits(newNumHits) {
    this._numHits = newNumHits;
  }
  get numHits() {
    return this._numHits;
  }

  hit() {
    this.numHits++;
  }

  isSunk() {
    return this.numHits >= this.length;
  }
}
