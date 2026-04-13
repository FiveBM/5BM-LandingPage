import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Etapa {
  num: string;
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-processo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.scss'],
})
export class ProcessoComponent {
  etapas: Etapa[] = [
    {
      num: '01',
      titulo: 'Descoberta',
      descricao:
        'Reunião de alinhamento para entender seus objetivos, público-alvo e necessidades técnicas do projeto.',
    },
    {
      num: '02',
      titulo: 'Proposta',
      descricao:
        'Apresentamos escopo detalhado, prazo e investimento. Sem surpresas ou custos ocultos.',
    },
    {
      num: '03',
      titulo: 'Desenvolvimento',
      descricao:
        'Construção iterativa com entregas parciais. Você acompanha o progresso em tempo real via Notion e GitHub.',
    },
    {
      num: '04',
      titulo: 'Entrega & Suporte',
      descricao:
        'Deploy em produção com testes completos. Suporte pós-entrega garantido para qualquer ajuste necessário.',
    },
  ];
}
