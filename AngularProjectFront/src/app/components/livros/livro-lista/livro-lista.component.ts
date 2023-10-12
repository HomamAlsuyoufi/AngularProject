import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.scss']
})
export class LivroListaComponent {
  lista: Livro[] = [];

  livroParaEditar: Livro = new Livro();
  indiceSelecionadoParaEdicao!: number;
  
  modalService = inject(NgbModal);
  livroService = inject(LivroService);

  constructor() {
    this.listar();
  }
  

  listar(){
    this.livroService.listar().subscribe({
      next: lista => {
        this.lista = lista;
      }
    })
  }

    cadastrar(modalLivro : any){
      this.livroParaEditar = new Livro();
      this.modalService.open(modalLivro, { size: 'sm' });
      
      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Cadastrar Livro'
    }

    editar(modal: any, livro: Livro, indice: number) {
      this.livroParaEditar = Object.assign({}, livro); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });

      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Editar Livro'
    }

    atualizarLista(livro: Livro) {
      this.listar();
      this.modalService.dismissAll();
      console.log("eeeeeeee")
    }

    excluirLivro(livro: Livro) {
      if (confirm(`Tem certeza de que deseja excluir ${livro.titulo}?`)) {
        this.livroService.deletar(livro.id).subscribe({
          next: () => {
            this.listar(); // Atualize a lista após a exclusão
            alert('Livro excluída com sucesso!');
          },
          error: (erro) => {
            alert('Ocorreu um erro ao excluir a livro.');
            console.error(erro);
          }
        });
      }
    }
}
