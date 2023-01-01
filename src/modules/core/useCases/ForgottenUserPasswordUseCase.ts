import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { container, inject, injectable } from 'tsyringe';

import { HandleErrors } from '../../../shared/errors/HandleErrors';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IDateProvider } from '../../../shared/providers/IDateProvider';
import { IMailProvider } from '../../../shared/providers/IMailProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { UserRepository } from '../../repositories/implementations/UsersRepository';
import { DateProvider } from '../../../shared/providers/implementations/DateProvider';
import { MailProvider } from '../../../shared/providers/implementations/EtherealMailProvider';
import { UsersTokensRepository } from '../../repositories/implementations/UsersTokensRepository';
import { SESMailProvider } from '../../../shared/providers/implementations/SESMailProvider';

const mailProvider = {
	ses: SESMailProvider,
	ethereal: MailProvider,
};

@injectable()
class ForgottenUserPasswordUseCase {
	constructor(
		@inject(DateProvider)
		private dateProvider: IDateProvider,
		@inject(mailProvider[process.env.MAIL_PROVIDER])
		private mailProvider: IMailProvider,
		@inject(UserRepository)
		private userRepository: IUserRepository,
		@inject(UsersTokensRepository)
		private usersTokensRepository: IUsersTokensRepository
	) {}

	async execute(email: string): Promise<void> {
		const user = await this.userRepository.findByEmail(email);

		const templatePath = resolve(__dirname, '..', '..', '..', 'views', 'emails', 'forgottenPassword.hbs');

		if (!user) {
			throw new HandleErrors('E-mail incorreto!');
		}

		const token = uuidV4();

		const linkDurationTimeInHours = 3;
		const expires_date = this.dateProvider.addHours(linkDurationTimeInHours);

		await this.usersTokensRepository.create({
			user_id: user.id,
			refresh_token: token,
			expires_date: expires_date,
		});

		const templateVariables = {
			name: user.name,
			link: `http://localhost:3838/password/reset?token=${token}`,
		};

		await this.mailProvider.sendMail(email, 'Recuperação de senha', templateVariables, templatePath);
	}
}

export { ForgottenUserPasswordUseCase };
