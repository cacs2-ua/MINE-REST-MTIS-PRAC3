const { connection } = require('./Conexion');

/**
 * Inserta un nuevo nivel en la base de datos.
 * @param {Object} nivelData - Objeto con la información del nivel.
 * @param {number} nivelData.nivel - Valor del nivel.
 * @param {string} nivelData.descripcion - Descripción del nivel.
 * @returns {Promise<number>} - Promesa que resuelve con el ID del registro insertado.
 */
function insertarNivel(nivelData) {
  return new Promise((resolve, reject) => {
    const { nivel, descripcion } = nivelData;
    const query = 'INSERT INTO niveles (nivel, descripcion) VALUES (?, ?)';
    
    connection.query(query, [nivel, descripcion], (error, results) => {
      if (error) {
        console.error('Error al insertar el nivel:', error);
        return reject(error);
      }
      console.log('Nivel insertado correctamente con ID:', results.insertId);
      resolve(results.insertId);
    });
  });
}

/**
 * Borra un nivel de la base de datos.
 * @param {number} nivel - Valor único que identifica el nivel a borrar.
 * @returns {Promise<number>} - Promesa que resuelve con el número de filas afectadas.
 */
function borrarNivel(nivel) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM niveles WHERE nivel = ?';
    connection.query(query, [nivel], (error, results) => {
      if (error) {
        console.error('Error al borrar el nivel:', error);
        return reject(error);
      }
      console.log('Nivel borrado correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

/**
 * Consulta un nivel en la base de datos.
 * @param {number} nivel - Valor único que identifica el nivel a consultar.
 * @returns {Promise<Object|null>} - Promesa que resuelve con el registro encontrado o null si no existe.
 */
function consultarNivel(nivel) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM niveles WHERE nivel = ?';
    connection.query(query, [nivel], (error, results) => {
      if (error) {
        console.error('Error al consultar el nivel:', error);
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
 * Modifica un nivel existente en la base de datos.
 * Se utiliza el campo "id" como identificador para actualizar tanto el nivel como la descripción.
 * @param {Object} nivelData - Objeto con la información del nivel.
 * @param {number} nivelData.id - Identificador único del nivel a modificar.
 * @param {number} nivelData.nivel - Nuevo valor del nivel.
 * @param {string} nivelData.descripcion - Nueva descripción del nivel.
 * @returns {Promise<number>} - Promesa que resuelve con el número de filas afectadas.
 */
function modificarNivel(nivelData) {
  return new Promise((resolve, reject) => {
    const { id, nivel, descripcion } = nivelData;
    const query = 'UPDATE niveles SET nivel = ?, descripcion = ? WHERE id = ?';
    connection.query(query, [nivel, descripcion, id], (error, results) => {
      if (error) {
        console.error('Error al modificar el nivel:', error);
        return reject(error);
      }
      console.log('Nivel modificado correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

module.exports = {
    insertarNivel,
    borrarNivel,
    consultarNivel,
    modificarNivel,
  };