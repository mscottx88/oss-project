import { Pool, PoolClient, QueryResult } from 'pg';
export { QueryResult } from 'pg';

const pool: Pool = new Pool();

pool.on('error', (error: Error) => {
  console.error(`An unexpected error occurred in the pg-pool: '${error}'`);
});

export interface IRunQuery {
  parameters: any[]; // tslint:disable-line:no-any
  statement: string;
}

/**
 * This convenience method runs a single query.
 *
 * @param {IRunQuery} options
 * * parameters - Any parameters to be injected into the statement.
 * * statement - The SQL statement to run.
 *
 * @returns {Promise<QueryResult>}
 * A Promise resolving to the results of the query.
 */
export async function runQuery({ parameters, statement }: IRunQuery): Promise<QueryResult> {
  const statements: IRunQuery[] = [{ parameters, statement }];
  const [result]: [QueryResult] = await module.exports.runTransaction({ statements });
  return result;
}

export interface IRunTransaction {
  statements: IRunQuery[];
}

/**
 * Run a transaction.
 *
 * @param {IRunTransaction} options
 * * statements - The statements along with parameters to run.
 *
 * @throws {Error}
 * Thrown if any error occurs.
 *
 * @returns {Promise<QueryResult[]>}
 * A Promise resolving with results upon completion of the transaction.
 */
export async function runTransaction({ statements }: IRunTransaction): Promise<QueryResult[]> {
  const client: PoolClient = await pool.connect();

  const results: QueryResult[] = [];
  try {
    await client.query('BEGIN');
    for (const { parameters, statement } of statements) {
      results.push(await client.query(statement, parameters));
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  return results;
}

module.exports = {
  runQuery,
  runTransaction,
};
