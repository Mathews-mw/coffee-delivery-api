import Knex from 'knex';
import { knexConfig } from '../../knexfile';

const knexConnection = Knex(knexConfig.development);

export default knexConnection;
