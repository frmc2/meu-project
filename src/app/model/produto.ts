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
    categoria: 'Bebidas',
    nome: 'Coca-Cola lata',
    descricao: 'Refrigerante Coca-Cola lata de 350 ml.',
    preco: 3.99,
    imagem: 'imgs/Coca-cola.png'
  },

  {
    id: 2,
    categoria: 'Salgado',
    nome: 'Batata Lays',
    descricao: 'Batata Lays sabor clássica 62g.',
    preco: 9.00,
    imagem: 'imgs/Batata-lays.png'
  },

  {
    id: 3,
    categoria: 'Doce',
    nome: 'Chocolate KitKat',
    descricao: 'Chocolate KitKat clássico de 41,5g.',
    preco: 3.50,
    imagem: 'imgs/Chocolate-kitkat.png'
  },

  {
    id: 4,
    categoria: 'Salgado',
    nome: 'Doritos',
    descricao: 'Salgadinho de queijo nacho Doritos 67g.',
    preco: 7.50,
    imagem: 'imgs/Doritos.png'
  },

  {
    id: 5,
    categoria: 'Bebidas',
    nome: 'Monster energy',
    descricao: 'Energético Monster Energy 473ml.',
    preco: 9.50,
    imagem: 'imgs/Monster-branco.png'
  },

  {
    id: 6,
    categoria: 'Doce',
    nome: 'Pacote M&M',
    descricao: 'Chocolate ao leite M&M 40g.',
    preco: 12.50,
    imagem: 'imgs/M&M.png'
  },

  {
    id: 7,
    categoria: 'Salgado',
    nome: 'Torcida pimenta mexicana',
    descricao: 'Salgadinho torcida sabor pimenta mexicana 35g.',
    preco: 1.60,
    imagem: 'imgs/Torcida-pim.png'
  },

  {
    id: 8,
    categoria: 'Bebidas',
    nome: 'Lipton 1,5L',
    descricao: 'Chá de limão Lipton.',
    preco: 8.00,
    imagem: 'imgs/Lipton.png'
  },

  {
    id: 9,
    categoria: 'Doce',
    nome: 'Fini Torção',
    descricao: 'Fini marshmallow Torção 60g.',
    preco: 7.00,
    imagem: 'imgs/Fini-marsh.png'
  }
];
