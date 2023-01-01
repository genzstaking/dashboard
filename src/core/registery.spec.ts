/**
 * @jest-environment jsdom
 */
import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import { registry } from "./registry";

import { nextTick, makeTestFixture } from '../test-helper';

//------------------------------------------------------------------------------
// Setup
//------------------------------------------------------------------------------
let fixture: HTMLElement;
//let env: Env;

beforeEach(() => {
  fixture = makeTestFixture();
});

afterEach(() => {
  fixture.remove();
});

test('Category must not be null', () => {
  expect(registry.category('xxx' + Math.random())).not.toBe(null);
});


test('A unique category must be used with the same key', () => {
  let key = 'xxx' + Math.random();
  expect(registry.category(key)).toBe(registry.category(key));
});


test('Must keep an object', () => {
  let key = 'xxx' + Math.random();
  let value = new Object();
  expect(registry.add(key, value).get(key)).toBe(value);
});