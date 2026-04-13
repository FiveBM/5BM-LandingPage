import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Servico {
  num: string;
  titulo: string;
  descricao: string;
  iconPath: string; // SVG path(s) as string for inline SVG
}

export interface Tecnologia {
  nome: string;
}

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent {
  servicos: Servico[] = [
    {
      num: '01',
      titulo: 'Desenvolvimento Web',
      descricao:
        'Sites institucionais, landing pages e plataformas web com design moderno, responsivo e otimizado para performance e conversão.',
      iconPath: `<rect x="2" y="3" width="20" height="14" rx="2"/>
                 <path d="M8 21h8M12 17v4"/>`,
    },
    {
      num: '02',
      titulo: 'Aplicativos Mobile',
      descricao:
        'Apps iOS e Android construídos com React Native. Experiência nativa, performance real e integração com backends robustos.',
      iconPath: `<rect x="5" y="2" width="14" height="20" rx="2"/>
                 <path d="M12 18h.01"/>`,
    },
    {
      num: '03',
      titulo: 'Sistemas Personalizados',
      descricao:
        'Sistemas de gestão, dashboards analíticos e automações sob medida. Transformamos processos manuais em fluxos digitais eficientes.',
      iconPath: `<path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
                 <path d="M16 3H8L6 7h12z"/>`,
    },
  ];

  tecnologias: Tecnologia[] = [
    { nome: 'React'         },
    { nome: 'Next.js'       },
    { nome: 'React Native'  },
    { nome: 'Node.js'       },
    { nome: 'TypeScript'    },
    { nome: 'Python'        },
    { nome: 'PostgreSQL'    },
    { nome: 'Firebase'      },
    { nome: 'AWS'           },
    { nome: 'Figma'         },
    { nome: 'Flutter'       },
  ];
}
