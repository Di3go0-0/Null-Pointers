import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { ENV } from '../constans';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    const apiKey = ENV.CONSTANS.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY no está definida en las variables de entorno.');
    }
    this.resend = new Resend(apiKey);
  }

  async sendPasswordRecoveryEmail(to: string, code: string) {
    const subject = 'Código de Recuperación de Contraseña';
    const htmlBody = `
      <h1>Recuperación de Contraseña</h1>
      <p>Hola,</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
      <p>Usa el siguiente código para completar el proceso:</p>
      <h2 style="text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${code}</h2>
      <p>Si no solicitaste esto, puedes ignorar este correo de forma segura.</p>
      <p>Gracias,<br>El equipo de Tu App</p>
    `;

    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Null Pointers <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: htmlBody,
      });

      if (error) {
        this.logger.error('Error al enviar el email:', error);
        throw new Error(error.message);
      }

      this.logger.log(`Email de recuperación enviado a ${to} con éxito. ID: ${data?.id}`);
      return data;

    } catch (error) {
      this.logger.error(`Falló el envío de email a ${to}`, error.stack);
      throw error;
    }
  }
}
