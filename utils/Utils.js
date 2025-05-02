const db = require('../ConexionDB/Conexion');

async function validarWSKey(wSKey) {
    // Obtenemos la clave válida de la base de datos
    const validWsKeyRow = await db.obtenerRestKey();
    if (!validWsKeyRow) {
      throw { 
        status: 500, 
        message: "No se encontró la WSKey en la base de datos",
        salida: "Error interno: WSKey no encontrada en la base de datos" 
      };
    }
    
    // Suponiendo que la columna que contiene la clave se llama 'rest_key'
    const VALID_WS_KEY = validWsKeyRow.rest_key;
  
    // Validamos que se haya proporcionado la WSKey en la solicitud
    if (!wSKey) {
      throw { 
        status: 400, 
        message: "WSKey no proporcionada en la cabecera HTTP",
        salida: "Error: La cabecera WSKey es obligatoria" 
      };
    }
    if (wSKey !== VALID_WS_KEY) {
      throw { 
        status: 403, 
        message: "Acceso no autorizado",
        salida: "Error: WSKey inválida. Acceso denegado" 
      };
    }
  }

  module.exports = {
    validarWSKey,
  };
  