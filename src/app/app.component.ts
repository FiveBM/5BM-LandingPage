import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent }      from './components/nav/nav.component';
import { HomeComponent }     from './components/home/home.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { SobreComponent }    from './components/sobre/sobre.component';
import { ProcessoComponent } from './components/processo/processo.component';
import { ContatoComponent }  from './components/contato/contato.component';
import { FooterComponent }   from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavComponent, 
    HomeComponent, 
    ServicosComponent,
    ProjetosComponent,  
    SobreComponent, 
    ProcessoComponent,
    ContatoComponent, 
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1 }
      );
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }, 100);
  }
}