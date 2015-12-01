class Entry {
  constructor(time, callback, update, args) {
    this.time = time;
    this.callback = callback;
    this.running = 0;
    this.update = update;
    this.args = args;
  }

  get remaining() {
    return this.time - this.running;
  }

  reset(running) {
    this.running = running || 0;
  }
}

const updateAfterEntry = function(dt) {
  if (this.running !== 0 && this.running >= this.time) {
    return false;
  }

  this.running += dt;

  if (this.running >= this.time) {
    return this.callback(...this.args);
  } else {
    return false;
  }
};

const updateEveryEntry = function(dt) {
  this.running = this.running + dt;

  const iterations = Math.floor(this.running / this.time);
  if (iterations === 0) {
    return false;
  } else if (iterations === 1) {
    this.running -= this.time;
    return this.callback(...this.args);
  } else {
    const results = [];
    while (this.running >= this.time) {
      results.push(this.callback(...this.args));
      this.running -= this.time;
    }
    return results;
  }
};

const after = function(time, callback, ...args) {
  const entry = new Entry(time, callback, updateAfterEntry, args);
  return entry;
};

const every = function(time, callback, ...args) {
  const entry = new Entry(time, callback, updateEveryEntry, args);
  return entry;
};

export {after, every};
