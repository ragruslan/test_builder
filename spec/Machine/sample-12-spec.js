// Copyright (c) 2016-2017 Electric Imp
// This file is licensed under the MIT License
// http://opensource.org/licenses/MIT

'use strict';

require('jasmine-expect');
const Fixture = require('fixture-stdout');

const FILE = __dirname + '/../fixtures/sample-12/input.nut';
const init = require('./init')(FILE);
const stdoutFixture = new Fixture({ stream: process.stdout });

describe('Machine', () => {
  let machine, result, resultWithLC;

  beforeEach(() => {
    machine = init.createMachine();
    result = init.getResult();
  });

  it('should exhibit the expeted behaviour when including user-defined Javascript libraries', (done) => {
    stdoutFixture.capture(message => {
      try {
        expect(message).toBe("Hello world!\n");
        // Release STDOUT
        stdoutFixture.release();
        done();
      } catch (e) {
        fail(e);
      }
      // Returning false prevents message actually being logged to STDOUT
      return false;
    });
    expect(machine.execute('@include "input.nut"')).toBe(result);
  });
});
