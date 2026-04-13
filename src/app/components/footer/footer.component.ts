import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FooterCol {
  titulo: string;
  links: { label: string; href: string }[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  ano = new Date().getFullYear();

  colunas: FooterCol[] = [
    {
      titulo: 'Serviços',
      links: [
        { label: 'Sites & Landing Pages', href: '#servicos' },
        { label: 'Apps Mobile',           href: '#servicos' },
        { label: 'Sistemas Web',          href: '#servicos' },
        { label: 'UI/UX Design',          href: '#servicos' },
      ],
    },
    {
      titulo: 'Empresa',
      links: [
        { label: 'Sobre nós',  href: '#sobre'    },
        { label: 'Portfólio',  href: '#projetos' },
        { label: 'Processo',   href: '#processo' },
        { label: 'Contato',    href: '#contato'  },
      ],
    },
    {
      titulo: 'Contato',
      links: [
        { label: 'fivebm.dev@gmail.com', href: 'fivebm.dev@gmail.com' },
        { label: '(81) 9 9999-9999',        href: 'tel:5581999999999'              },
        { label: 'Recife, PE — Brasil',     href: '#'                              },
        { label: 'LinkedIn',                href: '#'                              },
      ],
    },
  ];
}
