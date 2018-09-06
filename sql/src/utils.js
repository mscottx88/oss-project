'use strict';

const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool();

/**
 * Create the schema with all of its objects from scratch, in the correct sequence.
 *
 * @returns {Promise<void>}
 * A Promise resolving upon schema creation.
 */
const createSchema = async () => {
  // 1. Cleanup environment
  // 2. Create schema
  // 3. Create sequences
  // 4. Create tables
  // 5. Create indexes
  // 6. Create functions

  const path = `${process.cwd()}/databases/coc/schemas/coc`;

  const statements = await Promise.all([
    // cleanup environment
    'DROP SCHEMA IF EXISTS coc CASCADE',
    // create schema
    fs.readFile(`${path}/coc.sql`, 'utf8'),
    // create sequences
    fs.readFile(`${path}/sequences/history_metric_id_seq.sql`, 'utf8'),
    fs.readFile(`${path}/sequences/player_history_id_seq.sql`, 'utf8'),
    fs.readFile(`${path}/sequences/player_id_seq.sql`, 'utf8'),
    // create tables
    fs.readFile(`${path}/tables/history_metric.sql`, 'utf8'),
    fs.readFile(`${path}/tables/player_history.sql`, 'utf8'),
    fs.readFile(`${path}/tables/player.sql`, 'utf8')
    // create indexes
    // create functions
  ]);

  await runTransaction({ statements });
};

/**
 * Load environment variables from VS Code style .env file: key=value
 *
 * @returns {void}
 */
const loadEnv = () => {
  const env = fs.readFileSync(`${__dirname}/.env`, 'utf8');
  const variables = env.split(/\n|\r/gm);

  for (const variable of variables) {
    if (!variable || /^\s*#/.test(variable)) {
      continue;
    }

    const [name, value] = variable.split('=');
    process.env[name] = value;
  }
};

/**
 * Run a transaction with some help to overcome errors.
 *
 * @param {Object} options
 * * ignoreErrors - Ignore any errors that may occur.
 * * parameters - Any parameters that need to be used in the statements.
 * * statements - The statements to run.
 *
 * @throws {Error}
 * If ignoreErrors is not enabled, any error is thrown.
 *
 * @returns {Promise<void>}
 * A promise resolving upon completion of the transaction.
 */
const runTransaction = async ({
  // eslint-disable-line max-statements
  ignoreErrors,
  parameters = [],
  statements
}) => {
  const client = await pool.connect();

  const results = [];
  try {
    await client.query('BEGIN');
    for (const [index, statement] of statements.entries()) {
      await client.query('SAVEPOINT A');
      try {
        results.push(await client.query(statement, parameters[index]));
        await client.query('RELEASE SAVEPOINT A');
      } catch (error) {
        results.push(error);
        if (!ignoreErrors) {
          throw error;
        }
        await client.query('ROLLBACK TO SAVEPOINT A');
      }
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  return results;
};

module.exports = {
  createSchema,
  loadEnv,
  runTransaction
};
