import { Order } from '../entities/Order';

enum PaymentEnum {
	CreditCard = 'creditCard',
	DebitCard = 'debitCard',
	Cash = 'cash',
}

export interface ICreateOrderDTO {
	user_id: number;
	cep: string;
	rua: string;
	numero: string;
	complemento?: string;
	bairro: string;
	cidade: string;
	uf: string;
	payment: 'creditCard' | 'debitCard' | 'cash';
	total_order: number;
}

export interface IOrderRepository {
	create(data: ICreateOrderDTO): Promise<Order>;
}
