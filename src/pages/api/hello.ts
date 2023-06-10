import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const numeros = await prisma.jogoDoBicho.findMany();

    if (numeros.length === 0) {
      res.json({ numero: null, nome: null });
      return;
    }

    const numeroAleatorio = Math.floor(Math.random() * numeros.length);
    const numero = numeros[numeroAleatorio].numero;
    const nome = numeros[numeroAleatorio].nome;

    res.json({ numero, nome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  } finally {
    await prisma.$disconnect();
  }
}
