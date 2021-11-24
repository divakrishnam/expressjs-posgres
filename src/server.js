import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';

(async () => {
  try {
    const db = new Database(environment.nodeEnv, dbConfig);
    await db.connect();
  } catch (error) {
    console.log(
      `Something went wrong when initializing the server:\n`,
      error.stack
    );
  }
})();