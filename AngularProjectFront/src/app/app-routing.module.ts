import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/principal/index/index.component';
import { PessoaListaComponent } from './components/pessoas/pessoa-lista/pessoa-lista.component';
import { LivroListaComponent } from './components/livros/livro-lista/livro-lista.component';
import { CarroListaComponent } from './components/carros/carro-lista/carro-lista.component';

const routes: Routes = [
  {path:"",component: IndexComponent,children:[
    {path:"pessoas",component:PessoaListaComponent},
    {path:"livros",component:LivroListaComponent},
    {path:"carros",component:CarroListaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
