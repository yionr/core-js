// some asserts based on https://github.com/petamoriken/float16/blob/master/test/f16round.js
import { createConversionChecker } from '../helpers/helpers';

import f16round from 'core-js-pure/full/math/f16round';

const { MAX_VALUE, MIN_VALUE } = Number;

QUnit.test('Math.f16round', assert => {
  assert.isFunction(f16round);
  assert.name(f16round, 'f16round');
  assert.arity(f16round, 1);
  assert.same(f16round(), NaN);
  assert.same(f16round(undefined), NaN);
  assert.same(f16round(NaN), NaN);
  assert.same(f16round(null), 0);
  assert.same(f16round(0), 0);
  assert.same(f16round(-0), -0);
  assert.same(f16round(MIN_VALUE), 0);
  assert.same(f16round(-MIN_VALUE), -0);
  assert.same(f16round(Infinity), Infinity);
  assert.same(f16round(-Infinity), -Infinity);
  assert.same(f16round(MAX_VALUE), Infinity);
  assert.same(f16round(-MAX_VALUE), -Infinity);

  const maxFloat16 = 65504;
  const minFloat16 = 2 ** -24;

  assert.same(f16round(maxFloat16), maxFloat16);
  assert.same(f16round(-maxFloat16), -maxFloat16);
  assert.same(f16round(minFloat16), minFloat16);
  assert.same(f16round(-minFloat16), -minFloat16);
  assert.same(f16round(minFloat16 / 2), 0);
  assert.same(f16round(-minFloat16 / 2), -0);
  assert.same(f16round(minFloat16 / 2 + 2 ** -25), minFloat16);
  assert.same(f16round(-minFloat16 / 2 - 2 ** -25), -minFloat16);

  assert.same(f16round(1.337), 1.3369140625);

  const checker = createConversionChecker(1.1);
  assert.same(f16round(checker), 1.099609375, 'object wrapper');
  assert.same(checker.$valueOf, 1, 'valueOf calls');
  assert.same(checker.$toString, 0, 'toString calls');
});
