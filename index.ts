import { AppServer } from './src/server'
import { Config } from './src/config';

const server = new AppServer(Config);

server.start();