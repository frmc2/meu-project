export interface Produto {
  id: number;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

export const produtos: Produto[] = [
  {
    id: 1,
    categoria: 'Refrigerante',
    nome: 'Coca-Cola lata 350 ml',
    descricao: 'Refrigerante Coca-Cola lata de 350 ml.',
    preco: 3.99,
    imagem: 'imgs/Coca-cola.png'
  },

  {
    id: 2,
    categoria: 'Salgadinho',
    nome: 'Batata Lays Clássica 62g',
    descricao: 'Batata Lays sabor clássica 62g.',
    preco: 9.00,
    imagem: 'imgs/Batata-lays.png'
  },

  {
    id: 3,
    categoria: 'Doce',
    nome: 'Chocolate KitKat 41,5g',
    descricao: 'Chocolate KitKat clássico de 41,5g.',
    preco: 3.50,
    imagem: 'imgs/Chocolate-kitkat.png'
  }
];
