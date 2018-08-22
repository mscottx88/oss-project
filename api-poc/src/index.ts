import { Application } from './app';
import { Config, default as getConfig } from './config';

async function main(): Promise<void> {
  try {
    const config: Config = getConfig();
    const { name: applicationName, port }: Config = config;

    const {
      default: getApp,
    }: { default: (config: Config) => Promise<Application> } = require('./app');

    const app: Application = await getApp(config);

    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.info(`${applicationName} listening on port ${port}.`);
    });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    process.exit(1);
  }
}

export default main();
