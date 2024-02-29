import app from "@/app";
import { PORT } from '@/common/constants';

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
