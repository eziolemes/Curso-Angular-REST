import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstrants } from '../app-constrants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario){
    return this.http.post(AppConstrants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      /*Retorno HTTP*/
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem('token', token);

      this.router.navigate(['home']);
    },
      error => {
        console.error("Erro ao fazer login");
        alert('Acesso Negado!');
      }
    );
  }
}
