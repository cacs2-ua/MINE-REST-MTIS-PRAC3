'use strict';

const salasRepository = require('../ConexionDB/SalasRepository');
var utils = require('../utils/Utils.js');

/**
 * Borrar una sala por su código
 *
 * codigoSala Integer Código de la sala  
 * wSKey String Clave de autenticación WSKey  
 * returns inline_response_200_1
 **/
exports.borrarSala = async function(codigoSala, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    const affectedRows = await salasRepository.borrarSala(codigoSala);
    if (affectedRows > 0) {
      return { 
        message: "Sala borrada correctamente",
        salida: "Sala borrada correctamente"
      };
    } else {
      throw { 
        message: "No se encontró la sala para borrar",
        salida: "No se encontró la sala para borrar"
      };
    }
  } catch (error) {
    throw { 
      message: error.message,
      salida: error.message 
    };
  }
}

/**
 * Consultar una sala por su código
 *
 * codigoSala Integer Código de la sala  
 * wSKey String Clave de autenticación WSKey  
 * returns Sala
 **/
exports.consultarSala = async function(codigoSala, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    const row = await salasRepository.consultarSala(codigoSala);
    if (row) {
      return {
        codigoSala: row.codigoSala,
        id: row.id,
        nombre: row.nombre,
        nivel: row.nivel,
        salida: "Sala con codigo " + codigoSala + " consultada correctamente"
      };
    } else {
      throw { 
        status: 404,
        message: "Sala con codigo " + codigoSala + " no encontrada",
        salida: "Sala con codigo " + codigoSala + " no encontrada"
      };
    }
  } catch (error) {
    throw { 
      status: 404,
      message: error.message,
      salida: error.message 
    };
  }
}

/**
 * Modificar una sala existente
 *
 * body Sala  
 * wSKey String Clave de autenticación WSKey  
 * returns inline_response_200
 **/
exports.modificarSala = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    const affectedRows = await salasRepository.modificarSala(body);
    if (affectedRows > 0) {
      return { 
        message: "Sala con id " + body.id + " modificada correctamente",
        status: 200,
        salida: "Sala con id " + body.id + " modificada correctamente"
      };
    } else {
      return { 
        message: "La sala con id " + body.id + " no se encontró para modificar",
        status: 404,
        salida: "La sala con id " + body.id + " no se encontró para modificar"
      };
    }
  } catch (error) {
    throw { 
      message: error.message,
      status: 404,
      salida: error.message 
    };
  }
}

/**
 * Crear una nueva sala
 *
 * body Sala  
 * wSKey String Clave de autenticación WSKey  
 * returns Sala
 **/
exports.nuevoSala = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);
    await salasRepository.insertarSala(body);
    let salaInsertada = await salasRepository.consultarSala(body.codigoSala);
    return { 
      codigoSala: salaInsertada.codigoSala,
      id: salaInsertada.id,
      nombre: salaInsertada.nombre,
      nivel: salaInsertada.nivel,
      salida: "Sala insertada correctamente"
    };
  } catch (error) {
    throw { 
      status: 404,
      message: error.message,
      salida: error.message 
    };
  }
};
