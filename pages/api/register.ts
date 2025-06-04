import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  // Verifica si el usuario ya existe
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "El usuario ya existe" });

  // Hashea la contraseña
  const hashed = await bcrypt.hash(password, 10);

  // Crea el usuario
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return res.status(201).json({ success: true, user: { id: user.id, email: user.email } });
}