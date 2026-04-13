import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Projeto {
  tag: string;
  nome: string;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent {
  projetos: Projeto[] = [
    {
      tag: 'Site institucional · Alimentação',
      nome: 'Toca do Sabor',
      descricao:
        'Site completo para hamburgueria artesanal com cardápio online, avaliações de clientes e botão de pedido integrado.',
      imagem: 'assets/proj-toca-do-sabor.png',
    },
    {
      tag: 'Aplicativo Mobile · Educação',
      nome: 'EDUConnect',
      descricao:
        'App mobile para escola técnica estadual com login de alunos e professores, comunicação e gestão acadêmica.',
      imagem: 'assets/proj-educonnect.png',
    },
    {
      tag: 'Dashboard · Broadcast / TV',
      nome: 'SquadGlobo',
      descricao:
        'Sistema de monitoramento de falhas de transmissão em tempo real para TV Globo, com clipes, filtros e painel analítico.',
      imagem: 'assets/proj-squadglobo.png',
    },
  ];
}
