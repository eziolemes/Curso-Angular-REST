import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';

@Component({
  selector: 'app-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudant(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if(this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("Usuario atualizado com sucesso " + data);
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("Gravado com Sucesso! " + data);
      });
    }
  }

  deletarTelefone(id, i) {

    //para remover telefones que só foi adicionado na tela, mas que ainda não enviou para a api
    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id !== null && confirm("Deseja remover?")) {
      this.userService.removerTelefone(id).subscribe(data => {
        console.info("Telefone removido = " + data);
        this.usuario.telefones.splice(i, 1);
      });
    }
  }

  addFone() {

    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone(); //instancia novamente para deixar pronto para o próximo registro

  }

  /*Para limpar a tela depois de gravar*/
  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
