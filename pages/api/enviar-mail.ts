import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email,comentario } = req.body;

  if (!comentario || comentario.trim() === '') {
    return res.status(400).json({ error: 'El comentario no puede estar vacío' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TU_EMAIL,
    subject: `Nuevo comentario en tu portfolio - ${nombre || 'Anónimo'}`,
    text: `
      Nombre: ${nombre || 'Anónimo'}
      Email: ${email || 'No proporcionado'}
      Comentario: ${comentario}
      Enviado desde: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
    `,
    html: `
      <h3>Nuevo comentario en tu portfolio</h3>
      <p><strong>Nombre:</strong> ${nombre || 'Anónimo'}</p>
      <p><strong>Email:</strong> ${email || 'No proporcionado'}</p>
      <p><strong>Comentario:</strong></p>
      <p>${comentario.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>IP: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}</small></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ error: 'Error al enviar el comentario' });
  }
}