import { Telefone } from './telefone';

export class User {

	id: Number;
	login: String;
	senha: String;
	nome: String;
	cpf: String;

	telefones: Array<Telefone>;
}