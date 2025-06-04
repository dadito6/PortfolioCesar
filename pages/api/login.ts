import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  // Busca el usuario
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

  // Verifica la contraseña
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  // Aquí podrías generar un token JWT, etc.
  return res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
}