import fs from 'fs';
import path from 'path';

export const deleteFile = async (filename: string) => {
	try {
		await fs.promises.stat(filename);
	} catch {
		return;
	}

	await fs.promises.unlink(filename);
};

export const readImageFile = async () => {
	const files = await fs.promises.readdir(path.join('tmp', '/', 'productsImages'));

	const accepetdExtensions = ['.jpg', '.png', '.svg'];

	const images = files.filter((file) => file.endsWith('png'));

	console.log(images);
};
