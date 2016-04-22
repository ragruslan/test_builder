/**
 * Builder
 * @author Mikhail Yurasov <mikhail@electricimp.com>
 */

'use strict';

const Machine = require('./Machine');
const AstParser = require('./AstParser');
const Expression = require('./Expression');
const FileReader = require('./Readers/FileReader');
const HttpReader = require('./Readers/HttpReader');

class Builder {

  constructor() {
    this._initMachine();
  }

  /**
   * Init machine
   * @private
   */
  _initMachine() {
    const fileReader = new FileReader();
    const httpReader = new HttpReader();
    const expression = new Expression();
    const parser = new AstParser();
    const machine = new Machine();

    machine.readers = {
      'file': fileReader,
      'http': httpReader,
      'git': null
    };

    machine.expression = expression;
    machine.parser = parser;
    machine.logger = this.logger;
    machine.generateLineControlStatements = false;

    this._machine = machine;
  }

  /**
   * @return {Machine}
   */
  get machine() {
    return this._machine;
  }

  /**
   * @return {{debug(), info(), warning(), error()}}
   */
  get logger() {
    return this._logger || {
        debug: console.log,
        info: console.info,
        warning: console.warning,
        error: console.error
      };
  }

  /**
   * @param {{debug(), info(), warning(), error()}} value
   */
  set logger(value) {
    this._logger = value;
    // update loggers
    this.machine.logger = value;
  }
}

module.exports = Builder;
