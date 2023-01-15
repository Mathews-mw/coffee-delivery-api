import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import upload from './config/upload';
import { router } from './routes/index.routes';
import rateLimiter from './middleware/rateLimiter';
import { createConnection } from './database/data-source';
import { HandleErrors } from './shared/errors/HandleErrors';

createConnection();

const app = express();
const port = process.env.PORT || 3838;

app.use(express.json());

// app.use(rateLimiter);

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
	environment: 'production',

	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// a função express.static('caminho da pasta dos arquivos') permite que o express passe arquivos armazenados localmente para o navegador ter acesso.
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/productsImages', express.static(`${upload.tmpFolder}/productsImages`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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
