import { Application } from './app';
import { default as getConfig, IConfig } from './config';

async function main(): Promise<void> {
  try {
    const config: IConfig = getConfig();
    const { name: applicationName, port }: IConfig = config;

    const {
      default: getApp,
    }: { default: (config: IConfig) => Promise<Application> } = require('./app');

    const app: Application = await getApp(config);

    app.listen(port, () => {
      console.info(`${applicationName} listening on port ${port}.`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default main();
