// controllers/Notificaciones.js
'use strict';

var utils = require('../utils/writer.js');
var Notificaciones = require('../service/NotificacionesService');
var ControllersUtils = require('./controllerUtils/controllerUtils');

module.exports.notificarError = function notificarError(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
  Notificaciones.notificarError(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: notificación de error enviada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || 'Error interno del servidor'));
      utils.writeJson(res, { message: error.message || 'Error interno del servidor' }, error.status || 404);
    });
};

module.exports.notificarPresenciaSala = function notificarPresenciaSala(req, res, next, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
  Notificaciones.notificarPresenciaSala(keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: notificación de presencia en sala enviada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || 'Error interno del servidor'));
      utils.writeJson(res, { message: error.message || 'Error interno del servidor' }, error.status || 404);
    });
};

module.exports.notificarUsuarioValido = function notificarUsuarioValido(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
  Notificaciones.notificarUsuarioValido(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: notificación de usuario válido enviada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || 'Error interno del servidor'));
      utils.writeJson(res, { message: error.message || 'Error interno del servidor' }, error.status || 404);
    });
};
