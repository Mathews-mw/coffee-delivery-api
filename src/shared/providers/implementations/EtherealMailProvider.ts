import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class MailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer
			.createTestAccount()
			.then((account) => {
				const transporter = nodemailer.createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass,
					},
				});
				this.client = transporter;
			})
			.catch((error) => console.error(error));
	}

	async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString('utf-8'); // Sistema ler o caminho onde se econtra o arquivo e então converte tudo para string

		const templateParse = handlebars.compile(templateFileContent); // Handlebars vaí compilar toda essa string

		const templateHTML = templateParse(variables); // Por fim, handlebars vai pegar essa compilação e ler as variáveis contidas para gerar o HTML

		const message = await this.client.sendMail({
			to,
			from: 'Coffe-Delivery <noreply@coffeeDelivery.com',
			subject,
			html: templateHTML,
		});

		console.log('Message sent: %s', message.messageId);
		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

export { MailProvider };
