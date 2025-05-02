const nodemailer = require('nodemailer');

/**
 * Crea y devuelve un transportador de emails configurado para FakeSMTP.
 */
function createTransport() {
  return nodemailer.createTransport({
    host: 'localhost',   // Dirección del servidor FakeSMTP
    port: 2525,          // Puerto de FakeSMTP (por defecto suele ser 2525)
    secure: false,       // No se utiliza TLS
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Envía un email utilizando el transportador configurado.
 * @param {string} to - Dirección de destino.
 * @param {string} subject - Asunto del email.
 * @param {string} text - Cuerpo del mensaje.
 * @returns {Promise} - Promesa que se resuelve cuando el email se envía correctamente.
 */
function sendEmail(to, subject, text) {
  const transporter = createTransport();
  const mailOptions = {
    from: '"FakeSMTP" <noreply@fakesmtp.com>',
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar email:', error);
        return reject(error);
      }
      console.log('Email enviado:', info.response);
      resolve(info);
    });
  });
}

module.exports = {
  createTransport,
  sendEmail
};
