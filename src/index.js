class Entry {
  constructor(time, callback, update) {
    this.time = time;
    this.callback = callback;
    this.running = 0;
    this.update = update;
  }

  get remaining() {
    return this.time - this.running;
  }

  reset(running) {
    this.running = running || 0;
  }
}

const updateAfterEntry = function(dt) {
  if (this.running >= this.time) {
    return null;
  }

  this.running += dt;

  if (this.running >= this.time) {
    return this.callback();
  }
};

const updateEveryEntry = function(dt) {
  this.running = this.running + dt;

  const results = [];
  while (this.running >= this.time) {
    results.push(this.callback());
    this.running -= this.time;
  }
  return results.length === 1 ? results[0] : results;
};

const after = function(time, callback) {
  const entry = new Entry(time, callback, updateAfterEntry);
  return entry;
};

const every = function(time, callback) {
  const entry = new Entry(time, callback, updateEveryEntry);
  return entry;
};

export {after, every};
