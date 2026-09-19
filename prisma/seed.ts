import { PrismaClient, StatusQuarto, CategoriaPrato, TipoMidia } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados O Corujão...');

  // 1. Criar Administrador Padrão (Senha fictícia de exemplo 'admin123')
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@ocorujao.com.br' },
    update: {},
    create: {
      nome: 'Administrador Master Corujão',
      email: 'admin@ocorujao.com.br',
      // Hash estático de exemplo para 'admin123' em ambiente local
      senhaHash: '$2b$10$wO3q2U0zU2o3Z7l5w5Z0e.Vp3E6M7B5rY2h1L8k0M3p4Q5r6S7t8u'
    }
  });
  console.log('✅ Admin criado:', admin.email);

  // 2. Criar Quartos da Pousada
  const quarto1 = await prisma.quarto.create({
    data: {
      numeroOuNome: 'Suíte 101',
      tipo: 'Master Pousada',
      precoDiaria: 320.00,
      status: StatusQuarto.DISPONIVEL,
      descricao: 'Cama King Size, Hidromassagem, Ar-Condicionado Split e Varanda Privativa com Vista Panorâmica.'
    }
  });

  const quarto2 = await prisma.quarto.create({
    data: {
      numeroOuNome: 'Chalé Família 102',
      tipo: 'Luxo Família',
      precoDiaria: 280.00,
      status: StatusQuarto.DISPONIVEL,
      descricao: 'Acomoda até 4 pessoas. 2 Camas de Casal, Frigobar Abastecido, Ar Climatizado e Smart TV.'
    }
  });

  const quarto3 = await prisma.quarto.create({
    data: {
      numeroOuNome: 'Apartamento 103',
      tipo: 'Standard Aconchego',
      precoDiaria: 220.00,
      status: StatusQuarto.DISPONIVEL,
      descricao: 'Ideal para casais ou viajantes a trabalho. Cama Queen, Wi-Fi 500MB e café da manhã incluso.'
    }
  });

  console.log('✅ 3 Quartos iniciais cadastrados!');

  // 3. Criar Pratos do Cardápio
  await prisma.pratoDia.createMany({
    data: [
      {
        nome: 'Picanha Nobre na Brasa',
        descricao: 'Fatiada na mesa com corte nobre e sal grosso especial.',
        preco: 0,
        categoria: CategoriaPrato.CHURRASCO,
        ativoHoje: true,
        imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80'
      },
      {
        nome: 'Costela Janela no Fogo de Chão',
        descricao: 'Assada lentamente por 12 horas. Derrete no garfo.',
        preco: 0,
        categoria: CategoriaPrato.CHURRASCO,
        ativoHoje: true,
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80'
      },
      {
        nome: 'Pudim de Leite Condensado Caseiro',
        descricao: 'Receita tradicional da vovó com calda de caramelo brilhante.',
        preco: 18.00,
        categoria: CategoriaPrato.SOBREMESA,
        ativoHoje: true,
        imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80'
      }
    ]
  });
  console.log('✅ Pratos do cardápio cadastrados!');

  // 4. Criar Mídias da Galeria
  await prisma.midia.createMany({
    data: [
      {
        titulo: 'Piscina Aquecida Iluminada',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
        tipo: TipoMidia.IMAGEM,
        categoria: 'Piscina'
      },
      {
        titulo: 'Salão Principal da Churrascaria',
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        tipo: TipoMidia.IMAGEM,
        categoria: 'Churrascaria'
      }
    ]
  });
  console.log('✅ Mídias da galeria cadastradas!');

  console.log('🚀 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
