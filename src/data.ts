interface Clube {
  id: number;
  nome: string;
}

interface Jogador {
  id: number;
  nome: string;
  clubeId: number;
}

export const clubes: Clube[] = [];
export const jogadores: Jogador[] = [];
