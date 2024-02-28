import config from 'config';
import app from "app";

const PORT = <number>config.get('PORT');

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
