import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carro';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-carro-lista',
  templateUrl: './carro-lista.component.html',
  styleUrls: ['./carro-lista.component.scss']
})
export class CarroListaComponent {
  lista: Carro[] = [];

  carroParaEditar: Carro = new Carro();
  indiceSelecionadoParaEdicao!: number;
  
  modalService = inject(NgbModal);
  carroService = inject(CarroService);

  constructor() {
    this.listar();
  }
  

  listar(){
    this.carroService.listar().subscribe({
      next: lista => {
        this.lista = lista;
      }
    })
  }

    cadastrar(modalCarro : any){
      this.carroParaEditar = new Carro();
      this.modalService.open(modalCarro, { size: 'sm' });
      
      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Cadastrar Carro'
    }

    editar(modal: any, carro: Carro, indice: number) {
      this.carroParaEditar = Object.assign({}, carro); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });

      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Editar Carro'
    }

    atualizarLista(carro: Carro) {
      this.listar();
      this.modalService.dismissAll();
      console.log("eeeeeeee")
    }

    excluirCarro(carro: Carro) {
      if (confirm(`Tem certeza de que deseja excluir ${carro.nome}?`)) {
        this.carroService.deletar(carro.id).subscribe({
          next: () => {
            this.listar(); // Atualize a lista após a exclusão
            alert('Carro excluída com sucesso!');
          },
          error: (erro) => {
            alert('Ocorreu um erro ao excluir a carro.');
            console.error(erro);
          }
        });
      }
    }
}
