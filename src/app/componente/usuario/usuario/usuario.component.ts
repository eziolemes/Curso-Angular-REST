import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Array<User[]>;
  nome: String;
  total: Number;

  constructor(private usuarioService: UsuarioService) {}

  carregarUsuarios() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  carregarUsuariosPorNome() {
        this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
  }

  /*Primeiro processo que será feito quando carregar a tela*/
  ngOnInit() {
    this.carregarUsuarios();
  }

  deleteUsuario(id: Number, index) {

    if (confirm('Deseja mesmo remover?')) {

      this.usuarioService.deletarUsuario(id).subscribe(data => {
        this.students.splice(index, 1); /*Remover da tela*/
      });
    }
  }

  consultarUser() {

    if (this.nome === '') {

      this.carregarUsuarios();

    } else {

      this.carregarUsuariosPorNome();

    }
  }

  carregarPagina(pagina) {

    if (this.nome !== '') {
      this.usuarioService.consultarUserPorPage(this.nome, (pagina - 1)).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    } else {

      this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });

    }
  }
}