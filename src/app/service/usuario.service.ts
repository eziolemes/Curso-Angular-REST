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

  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstrants.baseUrl + id, {responseType: 'text'});
  }
}
