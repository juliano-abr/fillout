import express, { Request, Response } from "express";
import formsRouter from "./routes/forms";

const app = express();

app.use(express.json());

app.use("/forms", formsRouter);

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("This is the main Fillout route");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
