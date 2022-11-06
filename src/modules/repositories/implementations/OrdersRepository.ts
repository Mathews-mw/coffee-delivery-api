import { Repository } from 'typeorm';
import AppDataSource from '../../../database/data-source';
import { Order } from '../../entities/Order';
import { ICreateOrderDTO, IOrderRepository } from '../IOrderRepository';

class OrdersRepository implements IOrderRepository {
	private respository: Repository<Order>;

	constructor() {
		this.respository = AppDataSource.getRepository(Order);
	}

	async create(data: ICreateOrderDTO): Promise<Order> {
		const { user_id, cep, rua, numero, complemento, bairro, cidade, uf, payment, total_order } = data;

		const newOrder = this.respository.create({
			user_id,
			cep,
			rua,
			numero,
			complemento,
			bairro,
			cidade,
			uf,
			payment,
			total_order,
		});

		await this.respository.createQueryBuilder().insert().into(Order).values(newOrder).returning('*').execute();

		return newOrder;
	}
}

export { OrdersRepository };
