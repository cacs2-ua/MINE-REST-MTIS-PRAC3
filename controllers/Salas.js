'use strict';

var utils = require('../utils/writer.js');
var Salas = require('../service/SalasService');
var ControllersUtils = require('./controllerUtils/controllerUtils');

module.exports.borrarSala = function borrarSala(req, res, next, codigoSala, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Salas.borrarSala(codigoSala, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: sala borrada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

module.exports.consultarSala = function consultarSala(req, res, next, codigoSala, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
  
  Salas.consultarSala(codigoSala, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseWithoutSalida } = response;
      res.set('salida', salida || 'Operación exitosa: sala consultada correctamente');
      utils.writeJson(res, responseWithoutSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

module.exports.modificarSala = function modificarSala(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Salas.modificarSala(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: sala modificada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

module.exports.nuevoSala = function nuevoSala(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Salas.nuevoSala(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      res.set('salida', salida || 'Operación exitosa: sala insertada correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 201);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};
