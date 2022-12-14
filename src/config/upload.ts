import multer from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
	tmpFolder,

	storage: multer.diskStorage({
		destination: tmpFolder,

		filename: (request, file, callback) => {
			const fileHash = crypto.randomBytes(8).toString('hex');
			const fileName = `${fileHash}_${file.originalname}`;

			return callback(null, fileName);
		},
	}),
};
