import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-detalhes',
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.scss']
})
export class LivroDetalhesComponent {
  @Input() livro:Livro = new Livro();
  @Output() retorno = new EventEmitter<Livro>;

  livroService = inject(LivroService);

  constructor() {}

  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ

    this.livroService.save(this.livro).subscribe({
      next: livro => { // QUANDO DÁ CERTO
        this.retorno.emit(livro);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
