import express, { Application } from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './router';

const app: Application = express();
const PORT = <number>config.get('PORT');

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
