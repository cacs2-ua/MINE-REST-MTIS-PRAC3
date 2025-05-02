// controllers/Dispositivos.js
'use strict';

var utils = require('../utils/writer.js');
var Dispositivos = require('../service/DispositivosService');
var ControllersUtils = require('./controllerUtils/controllerUtils');

/**
 * Borra un dispositivo y responde con el estado HTTP adecuado.
 * Si se borra correctamente, se retorna 200, y si no se encuentra, 404.
 */
module.exports.borrarDispositivo = function borrarDispositivo(req, res, next, codigo, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Dispositivos.borrarDispositivo(codigo, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: dispositivo borrado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Consulta un dispositivo y responde con el estado HTTP adecuado.
 * Si se encuentra el dispositivo, se retorna 200, y si no, 404.
 */
module.exports.consultarDispositivo = function consultarDispositivo(req, res, next, codigo, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Dispositivos.consultarDispositivo(codigo, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseWithoutSalida } = response;
      res.set('salida', salida || 'Operación exitosa: dispositivo consultado correctamente');
      utils.writeJson(res, responseWithoutSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Modifica un dispositivo existente y responde con el estado HTTP adecuado.
 */
module.exports.modificarDispositivo = function modificarDispositivo(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Dispositivos.modificarDispositivo(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: dispositivo modificado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Crea un nuevo dispositivo y responde con el estado HTTP adecuado.
 * Si se crea correctamente, se retorna 201 (Created); de lo contrario, se utiliza 404.
 */
module.exports.nuevoDispositivo = function nuevoDispositivo(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Dispositivos.nuevoDispositivo(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: dispositivo insertado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 201);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};
