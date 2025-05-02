'use strict';

var utils = require('../utils/writer.js');
var Niveles = require('../service/NivelesService');
var ControllersUtils = require('./controllerUtils/controllerUtils');

/**
 * Borra un nivel y responde con el estado HTTP adecuado.
 * Si se borra correctamente, se retorna 200, y si no se encuentra, 404.
 */
module.exports.borrarNivel = function borrarNivel(req, res, next, nivel, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Niveles.borrarNivel(nivel, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;

      res.set('salida', salida || 'Operación exitosa: nivel borrado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Consulta un nivel y responde con el estado HTTP adecuado.
 * Si se encuentra el nivel, se retorna 200, y si no, 404.
 */
module.exports.consultarNivel = function consultarNivel(req, res, next, nivel, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
  
  Niveles.consultarNivel(nivel, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseWithoutSalida } = response;
      res.set('salida', salida || 'Operación exitosa: nivel consultado correctamente');
      
      utils.writeJson(res, responseWithoutSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Modifica un nivel existente y responde con el estado HTTP adecuado.
 * Se utiliza el status retornado por el servicio (200 si fue modificado, 404 si no se encontró).
 */
module.exports.modificarNivel = function modificarNivel(req, res, next, body, wSKey) {
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  Niveles.modificarNivel(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;

      res.set('salida', salida || 'Operación exitosa: nivel modificado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 200);
    })
    .catch(function(error) {
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};

/**
 * Crea un nuevo nivel y responde con el estado HTTP adecuado.
 * Si se crea correctamente, se retorna 201 (Created); de lo contrario, se utiliza 400.
 */
module.exports.nuevoNivel = function nuevoNivel(req, res, next, body, wSKey) {
  // Extraemos WSKey de los rawHeaders
  const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

  // Llamamos al servicio pasando la WSKey
  Niveles.nuevoNivel(body, keyFromRawHeaders)
    .then(function(response) {
      const { salida, ...responseSinSalida } = response;
      
      res.set('salida', salida || 'Operación exitosa: nivel insertado correctamente');
      utils.writeJson(res, responseSinSalida, response.status || 201);
    })
    .catch(function(error) {
      // En caso de error, se envía el detalle del error en el header
      res.set('salida', error.salida || (error.message || "Error interno del servidor"));
      utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
    });
};





