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
    categoria: 'Salgados',
    nome: 'Batata Lays',
    descricao: 'Batata Lays sabor clássica 62g.',
    preco: 9.00,
    imagem: 'imgs/Batata-lays.png'
  },

  {
    id: 3,
    categoria: 'Doces',
    nome: 'Chocolate KitKat',
    descricao: 'Chocolate KitKat clássico de 41,5g.',
    preco: 3.50,
    imagem: 'imgs/Chocolate-kitkat.png'
  },

  {
    id: 4,
    categoria: 'Salgados',
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
    categoria: 'Doces',
    nome: 'Pacote M&M',
    descricao: 'Chocolate ao leite M&M 40g.',
    preco: 12.50,
    imagem: 'imgs/M&M.png'
  },

  {
    id: 7,
    categoria: 'Salgados',
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
    categoria: 'Doces',
    nome: 'Fini Torção',
    descricao: 'Fini marshmallow Torção 60g.',
    preco: 7.00,
    imagem: 'imgs/Fini-marsh.png'
  },

  {
    id: 10,
    categoria: 'Salgados',
    nome: 'Cheetos - Cheddar',
    descricao: 'Cheetos sabor cheddar 131g.',
    preco: 7.50,
    imagem: 'imgs/cheetos_cheddar.png'
  },

  {
    id: 11,
    categoria: 'Salgados',
    nome: 'Cheetos - Requeijão',
    descricao: 'Cheetos sabor requeijão 131g.',
    preco: 7.50,
    imagem: 'imgs/cheetos_requeijao.png'
  },

  {
    id: 12,
    categoria: 'Salgados',
    nome: 'Pringles - Original',
    descricao: 'Pringles sabor original 170g.',
    preco: 12.00,
    imagem: 'imgs/pringles.png'
  },

  {
    id: 13,
    categoria: 'Salgados',
    nome: 'Ruflles - Original',
    descricao: 'Ruflles sabor original 131g.',
    preco: 7.50,
    imagem: 'imgs/ruflles.png'
  },

  {
    id: 14,
    categoria: 'Lanches',
    nome: 'Pastel de Forno - Carne',
    descricao: 'Pastel de Forno sabor carne 131g.',
    preco: 5.50,
    imagem: 'imgs/pastel_de_forno.png'
  },

  {
    id: 15,
    categoria: 'Lanches',
    nome: 'Pastel de Forno - Frango',
    descricao: 'Pastel de Forno sabor frango 131g.',
    preco: 5.50,
    imagem: 'imgs/pastel_de_forno.png'
  },

  {
    id: 16,
    categoria: 'Lanches',
    nome: 'Esfiha - Carne',
    descricao: 'Esfiha sabor carne 131g.',
    preco: 4.00,
    imagem: 'imgs/esfiha.png'
  },

  {
    id: 17,
    categoria: 'Lanches',
    nome: 'Croassant - Frango',
    descricao: 'Croassant sabor frango 131g.',
    preco: 4.50,
    imagem: 'imgs/croassant.png'
  },

  {
    id: 18,
    categoria: 'Lanches',
    nome: 'Croassant - Carne',
    descricao: 'Croassant sabor carne 131g.',
    preco: 4.50,
    imagem: 'imgs/croassant.png'
  },

  {
    id: 19,
    categoria: 'Bebidas',
    nome: 'Fanta Laranja Lata',
    descricao: 'Refrigerante Fanta Laranja 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_laranja_lata.png'
  },

  {
    id: 20,
    categoria: 'Bebidas',
    nome: 'Fanta Uva Lata',
    descricao: 'Refrigerante Fanta Uva 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_uva_lata.png'
  },

  {
    id: 21,
    categoria: 'Bebidas',
    nome: 'Fanta Guaraná Lata',
    descricao: 'Refrigerante Fanta Guaraná 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_guarana_lata.png'
  },

  {
    id: 22,
    categoria: 'Bebidas',
    nome: 'Fanta Maracujá Lata',
    descricao: 'Refrigerante Fanta Maracujá 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_maracuja_lata.png'
  },

  {
    id: 23,
    categoria: 'Bebidas',
    nome: 'Fanta Caju lata',
    descricao: 'Refrigerante Fanta Caju 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_caju_lata.png'
  },

  {
    id: 24,
    categoria: 'Bebidas',
    nome: 'Fanta Laranja Zero lata',
    descricao: 'Refrigerante Fanta Laranja Zero 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_laranja_zero_lata.png'
  },

  {
    id: 25,
    categoria: 'Bebidas',
    nome: 'Fanta Blue Mistério lata',
    descricao: 'Refrigerante Fanta Blue Mistério 350ml.',
    preco: 5.00,
    imagem: 'imgs/fanta_blue_misterio_lata.png'
  },


  {
    id: 26,
    categoria: 'Bebidas',
    nome: 'Fanta Uva Garrafa 2L',
    descricao: 'Refrigerante Fanta Uva 2L.',
    preco: 5.00,
    imagem: 'imgs/fanta_uva_2l.png'
  },

  {
    id: 27,
    categoria: 'Bebidas',
    nome: 'Fanta Laranja Garrafa 2L',
    descricao: 'Refrigerante Fanta Laranja 2L.',
    preco: 5.00,
    imagem: 'imgs/fanta_laranja_2l.png'
  },

  {
    id: 28,
    categoria: 'Bebidas',
    nome: 'Fanta Guaraná Garrafa 2L',
    descricao: 'Refrigerante Fanta Guaraná 2L.',
    preco: 5.00,
    imagem: 'imgs/fanta_guarana_2l.png'
  },

  {
    id: 29,
    categoria: 'Outros',
    nome: 'Mouse Aqua-Liquid Blue Skeuoss',
    descricao: 'Mouse Skeuoss estilo Frutiger Aero - Aqua Liquid/Blue.',
    preco: 25.00,
    imagem: 'imgs/skeuoss_frutigeraero-aqualiquidmouse-blue.png'
  },

  {
    id: 30,
    categoria: 'Outros',
    nome: 'Mouse Aqua-Liquid Clear Blue Skeuoss',
    descricao: 'Mouse Skeuoss estilo Frutiger Aero - Aqua Liquid/Clear Blue.',
    preco: 25.00,
    imagem: 'imgs/skeuoss_frutigeraero-aqualiquidmouse-clearblue.png'
  },

  {
    id: 31,
    categoria: 'Outros',
    nome: 'Poster Aqua Frutiger Aero',
    descricao: 'Poster estilo Frutiger Aero - Aqua Blue.',
    preco: 30.00,
    imagem: 'imgs/posteraqua_fruntigeraero.png'
  },

 {
    id: 32,
    categoria: 'Outros',
    nome: 'Poster Globe Frutiger Aero',
    descricao: 'Poster estilo Frutiger Aero - Globe.',
    preco: 30.00,
    imagem: 'imgs/posterglobe_fruntigeraero.png'
  },

  {
    id: 33,
    categoria: 'Outros',
    nome: 'Poster Promissed Future Frutiger Aero',
    descricao: 'Poster estilo Frutiger Aero - Promissed Future.',
    preco: 30.00,
    imagem: 'imgs/posterpromissedfuture_fruntigeraero.png'
  },

  {
    id: 34,
    categoria: 'Outros',
    nome: 'Mouse Pad Frutiger Aero - Aqua',
    descricao: 'Mouse Pad estilo Frutiger Aero Aqua.',
    preco: 38.99,
    imagem: 'imgs/mousepad_fruntigeraero-aqua.png'
  },

  {
    id: 35,
    categoria: 'Outros',
    nome: 'Mouse Pad Frutiger Aero - Promissed Future',
    descricao: 'Mouse Pad estilo Frutiger Aero Promissed Future.',
    preco: 38.99,
    imagem: 'imgs/mousepad_fruntigeraero-promissedfuture.png'
  },

  {
    id: 36,
    categoria: 'Outros',
    nome: 'Camisa T-SHIRT Unissex Frutiger Aero',
    descricao: 'Camisa T-SHIRT Unissex estilo Frutiger Aero.',
    preco: 50.00,
    imagem: 'imgs/camisa_t-shirt_unissex_fruntigeraearo.png'
  },

  {
    id: 37,
    categoria: 'Outros',
    nome: 'Camisa T-SHIRT Unissex Sports Frutiger Aero',
    descricao: 'Camisa T-SHIRT Unissex estilo Frutiger Aero Sports.',
    preco: 50.00,
    imagem: 'imgs/camisa_t-shirt_unissex_sports_fruntigeraero.png'
  },

  {
    id: 38,
    categoria: 'Outros',
    nome: 'Bonecos Frutiger Aero - MSN (10 peças)',
    descricao: 'Bonecos estilo Frutiger Aero - MSN (10 peças).',
    preco: 19.99,
    imagem: 'imgs/bonecos_fruntigeraero-MSN_10pcs.png'
  },

  {
    id: 39,
    categoria: 'Outros',
    nome: 'Bixo de Pelucia Fruntiger Aero - Axoloti',
    descricao: 'Bixo de Pelucia estilo Frutiger Aero - Axoloti.',
    preco: 65.00,
    imagem: 'imgs/bixodepelucia_fruntigeraero_axoloti.png'
  },




];
