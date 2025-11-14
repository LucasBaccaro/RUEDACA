import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar que la API key esté configurada
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'your_resend_api_key_here') {
      console.error('RESEND_API_KEY no está configurada correctamente');
      return NextResponse.json(
        { error: 'El servicio de email no está configurado. Por favor contacta al administrador.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Camila <noreply@ruedaca.com>',
      to: ['ruedaca97@gmail.com'],
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #D797EE 0%, #EAFE61 100%);
                padding: 30px;
                border-radius: 16px 16px 0 0;
                text-align: center;
              }
              .header h1 {
                color: white;
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e5e5e5;
                border-radius: 0 0 16px 16px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #D797EE;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
              }
              .message-box {
                background: #F5E8FC;
                padding: 20px;
                border-radius: 12px;
                border-left: 4px solid #D797EE;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e5e5;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>💌 Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Asunto</div>
                <div class="value">${subject}</div>
              </div>

              <div class="message-box">
                <div class="label">Mensaje</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>

              <div class="footer">
                Enviado desde tu portfolio • <a href="https://ruedaca.com">ruedaca.com</a>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Verificar si hubo error en el envío
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: `Error al enviar el email: ${error.message}` },
        { status: 500 }
      );
    }

    // Verificar que se haya enviado correctamente
    if (!data || !data.id) {
      console.error('No se recibió confirmación del envío');
      return NextResponse.json(
        { error: 'No se pudo confirmar el envío del mensaje' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data.id);
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
