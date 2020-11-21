import { mapObject } from './mapObject';

test('mapObject', () => {
  const object = { key1: 1, key2: 2 };
  const mapper = (v: number) => v + 1;
  const res = mapObject(object, mapper);

  expect(res).toEqual({ key1: 2, key2: 3 });
});
