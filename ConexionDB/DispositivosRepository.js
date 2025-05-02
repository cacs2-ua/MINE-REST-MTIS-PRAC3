// ConexionDB/DispositivosRepository.js
const { connection } = require('./Conexion');

/**
 * Inserta un nuevo dispositivo en la base de datos.
 * @param {Object} dispositivoData - Objeto con la información del dispositivo.
 * @param {number} dispositivoData.codigo - Código del dispositivo.
 * @param {string} dispositivoData.descripcion - Descripción del dispositivo.
 * @returns {Promise<number>} - Promesa que resuelve con el ID del registro insertado.
 */
function insertarDispositivo(dispositivoData) {
  return new Promise((resolve, reject) => {
    const { codigo, descripcion } = dispositivoData;
    const query = 'INSERT INTO dispositivo (codigo, descripcion) VALUES (?, ?)';
    connection.query(query, [codigo, descripcion], (error, results) => {
      if (error) {
        console.error('Error al insertar el dispositivo:', error);
        return reject(error);
      }
      console.log('Dispositivo insertado correctamente con ID:', results.insertId);
      resolve(results.insertId);
    });
  });
}

/**
 * Borra un dispositivo de la base de datos.
 * @param {number} codigo - Código del dispositivo a borrar.
 * @returns {Promise<number>} - Promesa que resuelve con el número de filas afectadas.
 */
function borrarDispositivo(codigo) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM dispositivo WHERE codigo = ?';
    connection.query(query, [codigo], (error, results) => {
      if (error) {
        console.error('Error al borrar el dispositivo:', error);
        return reject(error);
      }
      console.log('Dispositivo borrado correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

/**
 * Consulta un dispositivo en la base de datos.
 * @param {number} codigo - Código del dispositivo a consultar.
 * @returns {Promise<Object|null>} - Promesa que resuelve con el registro encontrado o null si no existe.
 */
function consultarDispositivo(codigo) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM dispositivo WHERE codigo = ?';
    connection.query(query, [codigo], (error, results) => {
      if (error) {
        console.error('Error al consultar el dispositivo:', error);
        return reject(error);
      }
      if(results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

/**
 * Modifica un dispositivo existente en la base de datos.
 * Se utiliza el campo "id" como identificador para actualizar tanto el código como la descripción.
 * @param {Object} dispositivoData - Objeto con la información del dispositivo.
 * @param {number} dispositivoData.id - Identificador único del dispositivo a modificar.
 * @param {number} dispositivoData.codigo - Nuevo código del dispositivo.
 * @param {string} dispositivoData.descripcion - Nueva descripción del dispositivo.
 * @returns {Promise<number>} - Promesa que resuelve con el número de filas afectadas.
 */
function modificarDispositivo(dispositivoData) {
  return new Promise((resolve, reject) => {
    const { id, codigo, descripcion } = dispositivoData;
    const query = 'UPDATE dispositivo SET codigo = ?, descripcion = ? WHERE id = ?';
    connection.query(query, [codigo, descripcion, id], (error, results) => {
      if (error) {
        console.error('Error al modificar el dispositivo:', error);
        return reject(error);
      }
      console.log('Dispositivo modificado correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

module.exports = {
  insertarDispositivo,
  borrarDispositivo,
  consultarDispositivo,
  modificarDispositivo,
};
