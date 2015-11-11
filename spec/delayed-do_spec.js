import expect from 'expect';
import * as delayedDo from '../src/index';

describe('delayedDo', function() {
  let counter = 0;
  const count = function(amount = 1) {
    counter += amount;
    return counter;
  };

  beforeEach(function() {
    counter = 0;
  });

  describe('after', function() {
    it('produces a clock that executes actions only once, at the right time', function() {
      const c1 = delayedDo.after(2, count);
      const c2 = delayedDo.after(4, count);

      // 1
      c1.update(1);
      expect(counter).toEqual(0);
      c2.update(1);
      expect(counter).toEqual(0);

      // 2
      c1.update(1);
      expect(counter).toEqual(1);
      c2.update(1);
      expect(counter).toEqual(1);

      // 3
      c1.update(1);
      expect(counter).toEqual(1);
      c2.update(1);
      expect(counter).toEqual(1);

      // 4
      c1.update(1);
      expect(counter).toEqual(1);
      c2.update(1);
      expect(counter).toEqual(2);
    });

    it('produces a clock that can be expired', function() {
      const c = delayedDo.after(2, count);
      expect(c.update(1)).toEqual(null);
      expect(c.update(1)).toEqual(1);
      expect(c.update(1)).toEqual(null);
    });

    it('returns the return value of the callback if it was run', function() {
      const c = delayedDo.after(2, count);
      expect(c.update(1)).toEqual(null);
      expect(c.update(1)).toEqual(1);
      expect(c.update(1)).toEqual(null);
    });

    it('respects bound function behaviour', function() {
      const boundCount = count.bind(count, 2);
      const c = delayedDo.after(1, boundCount, 1);
      c.update(1);
      expect(counter).toEqual(2);
    });

    it('passes arguments to the callback', function() {
      const c = delayedDo.after(1, count, 2);
      c.update(1);
      expect(counter).toEqual(2);
    });
  });

  describe('#every', function() {
    it('invokes callback periodically', function() {
      const c = delayedDo.every(3, count);

      c.update(1);
      expect(counter).toEqual(0);

      c.update(2);
      expect(counter).toEqual(1);

      c.update(2);
      expect(counter).toEqual(1);

      c.update(1);
      expect(counter).toEqual(2);
    });

    it('executes the same action multiple times on a single update if appropiate', function() {
      const c = delayedDo.every(1, count);
      c.update(2);
      expect(counter).toEqual(2);
    });

    it('returns all the returned values of the callback if it was run', function() {
      const c = delayedDo.every(1, count);
      expect(c.update(1)).toEqual(1);
      expect(c.update(2)).toEqual([2, 3]);
    });

    it('respects bound function behaviour', function() {
      const boundCount = count.bind(count, 2);
      const c = delayedDo.every(1, boundCount, 1);
      c.update(1);
      expect(counter).toEqual(2);
    });

    it('passes arguments to the callback', function() {
      const c = delayedDo.every(1, count, 2);
      c.update(2);
      expect(counter).toEqual(4);
    });
  });
});
