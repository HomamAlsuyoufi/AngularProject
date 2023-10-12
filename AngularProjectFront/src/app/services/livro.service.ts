import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  API: string = 'http://localhost:8080/api/livro';
  http = inject(HttpClient);

  constructor() { }


  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.API}` + "/listar");
  }

  save(livro: Livro): Observable<Livro> {
    if (livro.id) {
      // Se a livro já tem um ID, atualize-a
      return this.http.put<Livro>(this.API+"/"+`${livro.id}`, livro);
    } else {
      // Caso contrário, crie uma nova livro
      return this.http.post<Livro>(this.API, livro);
    }
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(this.API + "/" + `${id}`);
  }
}
