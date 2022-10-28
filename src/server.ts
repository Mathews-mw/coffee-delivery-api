import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import { router } from './routes/index.routes';
import { createConnection } from './database/data-source';
import { HandleErrors } from './shared/errors/HandleErrors';

createConnection('database_coffee_delivery');

const app = express();
const port = '3838';

app.use(express.json());

// a função express.static('caminho da pasta dos arquivos') permite que o express passe arquivos armazenados localmente para o navegador ter acesso.
app.use('/files', express.static('./tmp/'));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	console.log(err);
	if (err instanceof HandleErrors)
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});

	return response.status(500).json({
		status: 'error',
		message: `Internal server error - ${err.message}`,
	});
});

app.listen(port, () => {
	console.log(`Server is on and listen on port ${port}`);
});
