import expect from 'expect';
import * as delayedDo from '../src/index';

describe('delayedDo', function() {
  let counter = 0;
  const count = function(amount = 1){
    counter += amount;
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
  });
});
