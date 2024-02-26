import express, { Response } from 'express';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: unknown, res: Response) => res.send("LINE MAN Wongnai Frontend Assignment"));

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port http://localhost:${port}`);
    });
} catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
}