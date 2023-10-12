import { Component ,inject} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.scss']
})
export class PessoaListaComponent {
  lista: Pessoa[] = [];

  pessoaParaEditar: Pessoa = new Pessoa();
  indiceSelecionadoParaEdicao!: number;
  
  modalService = inject(NgbModal);
  pessoaService = inject(PessoaService);

  constructor() {
    this.listar();
  }
  

  listar(){
    this.pessoaService.listar().subscribe({
      next: lista => {
        this.lista = lista;
      }
    })
  }

    cadastrar(modalPessoa : any){
      this.pessoaParaEditar = new Pessoa();
      this.modalService.open(modalPessoa, { size: 'sm' });
      
      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Cadastrar Pessoa'
    }

    editar(modal: any, pessoa: Pessoa, indice: number) {
      this.pessoaParaEditar = Object.assign({}, pessoa); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
      this.indiceSelecionadoParaEdicao = indice;
  
      this.modalService.open(modal, { size: 'sm' });

      const element: HTMLElement = document.getElementById('h4') as HTMLElement 
      element.innerHTML = 'Editar Pessoa'
    }

    atualizarLista(pessoa: Pessoa) {
      this.listar();
      this.modalService.dismissAll();
      console.log("eeeeeeee")
    }

    excluirPessoa(pessoa: Pessoa) {
      if (confirm(`Tem certeza de que deseja excluir ${pessoa.nome}?`)) {
        this.pessoaService.deletar(pessoa.id).subscribe({
          next: () => {
            this.listar(); // Atualize a lista após a exclusão
            alert('Pessoa excluída com sucesso!');
          },
          error: (erro) => {
            alert('Ocorreu um erro ao excluir a pessoa.');
            console.error(erro);
          }
        });
      }
    }
}