import {describe, expect, test, beforeEach, afterEach} from '@jest/globals';
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