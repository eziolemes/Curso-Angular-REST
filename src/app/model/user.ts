import { Telefone } from './telefone';

export class User {

	id: Number;
	login: String;
	senha: String;
	nome: String;
	cpf: String;
	dataNascimento: String;

	telefones: Array<Telefone>;
}