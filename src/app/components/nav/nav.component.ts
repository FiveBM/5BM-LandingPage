import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  links = [
    { label: 'Serviços',  href: '#servicos'  },
    { label: 'Projetos',  href: '#projetos'  },
    { label: 'Sobre',     href: '#sobre'     },
    { label: 'Processo',  href: '#processo'  },
    { label: 'Contato',   href: '#contato'   },
  ];
}
