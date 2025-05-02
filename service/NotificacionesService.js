// service/NotificacionesService.js
'use strict';

const notificacionesRepository = require('../ConexionDB/NotificacionesRepository');
const fakeSMTP = require('../ConexionFakeSMTP/ConexionFakeSMTP');
const utils = require('../utils/Utils.js'); // Para validar la WSKey

/**
 * Notificar error a un empleado
 *
 * body Notificaciones_error_body 
 * wSKey String Clave de autenticación WSKey
 * returns inline_response_200_1
 **/
exports.notificarError = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    
    const { nif, error } = body;
    const empleado = await notificacionesRepository.getEmpleadoByNif(nif);
    if (!empleado) {
      throw { message: 'Empleado no encontrado.', salida: 'Empleado no encontrado.' };
    }
    const to = empleado.email;
    const subject = "Notificacion: Error en el sistema";
    const text = `Se ha detectado el siguiente error: ${error}`;
    await fakeSMTP.sendEmail(to, subject, text);
    return { 
      message: 'Notificación de error enviada exitosamente.',
      salida: 'Notificación de error enviada exitosamente.'
    };
  } catch (error) {
    throw { 
      message: error.message, 
      salida: error.message 
    };
  }
};

/**
 * Notificar presencia en sala
 *
 * wSKey String Clave de autenticación WSKey
 * returns inline_response_200_1
 **/
exports.notificarPresenciaSala = async function(wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    
    const registros = await notificacionesRepository.getPresenciaSalaData();
    if (registros.length === 0) {
      return { 
        message: 'No hay registros de presencia para notificar.',
        salida: 'No hay registros de presencia para notificar.' 
      };
    }
    const emailPromises = registros.map(registro => {
      const to = registro.email;
      const subject = 'Notificacion: Presencia en sala';
      const text = `Se ha detectado presencia en la sala: ${registro.salaNombre}`;
      return fakeSMTP.sendEmail(to, subject, text);
    });
    await Promise.all(emailPromises);
    return { 
      message: 'Notificaciones de presencia en sala enviadas exitosamente.',
      salida: 'Notificaciones de presencia en sala enviadas exitosamente.'
    };
  } catch (error) {
    throw { 
      message: error.message, 
      salida: error.message 
    };
  }
};

/**
 * Notificar usuario válido
 *
 * body Notificaciones_usuarioValido_body 
 * wSKey String Clave de autenticación WSKey
 * returns inline_response_200_1
 **/
exports.notificarUsuarioValido = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    
    const { nif } = body;
    const empleado = await notificacionesRepository.getEmpleadoByNif(nif);
    if (!empleado) {
      throw { message: 'Empleado no encontrado.', salida: 'Empleado no encontrado.' };
    }
    const to = empleado.email;
    let subject, text;
    if (empleado.valido === 1) {
      subject = 'Notificacion: Usuario valido';
      text = `Te comunicamos que tu usuario es valido. Esta todo correcto.`;
      await fakeSMTP.sendEmail(to, subject, text);
      return { 
        message: 'Notificación de usuario valido enviada exitosamente.',
        salida: 'Notificación de usuario valido enviada exitosamente.'
      };
    }

    else {
      return { 
        message: 'No se ha enviado ninguna notificacion puesto que el usuario no es valido.',
        salida: 'No se ha enviado ninguna notificacion puesto que el usuario no es valido.'
      };
    }

  } catch (error) {
    throw { 
      message: error.message, 
      salida: error.message 
    };
  }
};

/**
 * Notificar usuario no válido
 *
 * body Notificaciones_usuarioNoValido_body 
 * wSKey String Clave de autenticación WSKey
 * returns inline_response_200_1
 **/
exports.notificarUsuarioNoValido = async function(body,wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    
    const { email } = body;
    const to = email;
    let subject, text;
    if (empleado.valido === 0) {
      subject = 'Invalidez de usuario';
      text = `Te comunicamos que tu usuario ya no es valido.`;
      await fakeSMTP.sendEmail(to, subject, text);
      return { 
        message: 'Notificación de usuario no valido enviada exitosamente.',
        salida: 'Notificación de usuario no valido enviada exitosamente.'
      };
    }

    else {
      return { 
        message: 'No se ha enviado ninguna notificacion puesto que el usuario sí es valido.',
        salida: 'No se ha enviado ninguna notificacion puesto que el usuario sí es valido.'
      };
    }

  } catch (error) {
    throw { 
      message: error.message, 
      salida: error.message 
    };
  }
}
