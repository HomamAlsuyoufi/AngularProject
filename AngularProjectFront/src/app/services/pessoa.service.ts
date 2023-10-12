import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  API: string = 'http://localhost:8080/api/pessoa';
  http = inject(HttpClient);

  constructor() { }


  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.API}` + "/listar");
  }

  save(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id) {
      // Se a pessoa já tem um ID, atualize-a
      return this.http.put<Pessoa>(this.API+"/"+`${pessoa.id}`, pessoa);
    } else {
      // Caso contrário, crie uma nova pessoa
      return this.http.post<Pessoa>(this.API, pessoa);
    }
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(this.API + "/" + `${id}`);
  }
}