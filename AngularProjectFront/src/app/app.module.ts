import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaListaComponent } from './components/pessoas/pessoa-lista/pessoa-lista.component';
import { IndexComponent } from './components/principal/index/index.component';
import { HeaderComponent } from './components/principal/header/header.component';
import { FooterComponent } from './components/principal/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PessoaDetalhesComponent } from './components/pessoas/pessoa-detalhes/pessoa-detalhes.component';
import { LivroListaComponent } from './components/livros/livro-lista/livro-lista.component';
import { CarroListaComponent } from './components/carros/carro-lista/carro-lista.component';
import { CarroDetalhesComponent } from './components/carros/carro-detalhes/carro-detalhes.component';
import { LivroDetalhesComponent } from './components/livros/livro-detalhes/livro-detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaDetalhesComponent,
    PessoaListaComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    LivroListaComponent,
    CarroListaComponent,
    CarroDetalhesComponent,
    LivroDetalhesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
