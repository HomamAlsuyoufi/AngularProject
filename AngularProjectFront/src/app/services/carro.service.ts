import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  API: string = 'http://localhost:8080/api/carro';
  http = inject(HttpClient);

  constructor() { }


  listar(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.API}` + "/listar");
  }

  save(carro: Carro): Observable<Carro> {
    if (carro.id) {
      // Se a carro já tem um ID, atualize-a
      return this.http.put<Carro>(this.API+"/"+`${carro.id}`, carro);
    } else {
      // Caso contrário, crie uma nova carro
      return this.http.post<Carro>(this.API, carro);
    }
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(this.API + "/" + `${id}`);
  }
}
