import cors from 'cors';
import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

const port = '3838';

app.use(cors());
app.use(router)

app.listen(port, () => {
  console.log(`Server is on and listen on port ${port}`);
})