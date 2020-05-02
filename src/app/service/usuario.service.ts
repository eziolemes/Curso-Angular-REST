import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstrants } from '../app-constrants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstrants.baseUrl);
  }

    getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstrants.baseUrl + 'page/' + pagina);
  }

  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstrants.baseUrl + id, {responseType: 'text'});
  }

  getStudant(id: String): Observable<any> {
    return this.http.get<any>(AppConstrants.baseUrl + "v2/" + id);
  }

  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstrants.baseUrl + "usuarioPorNome/" + nome);
  }

  consultarUserPorPage(nome: String, page: Number): Observable<any> {
    return this.http.get(AppConstrants.baseUrl + "usuarioPorNome/" + nome + "/page/" + page);
  }

  salvarUsuario(user): Observable<any> {
    return this.http.post<any>(AppConstrants.baseUrl, user);
  }

  updateUsuario(user): Observable<any> {
    return this.http.put<any>(AppConstrants.baseUrl, user);
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstrants.baseUrl + "removerTelefone/" + id, {responseType: 'text'});
  }

  userAutenticado() {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}