import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';

const redisClient = redis.createClient({
	legacyMode: true,
	socket: {
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
	},
});

const limiter = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'rateLimiter',
	points: 10, // quantidade de requisições
	duration: 1, // por segundo por IP
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
	try {
		await redisClient.connect();

		await limiter.consume(request.ip);

		return next();
	} catch (error) {
		return response.status(429).json({ error: 'Too many requests' });
	} finally {
		await redisClient.disconnect();
	}
}
