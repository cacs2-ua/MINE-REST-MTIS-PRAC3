const { connection } = require('./Conexion');

/**
 * Obtiene los datos de presencia en sala uniendo las tablas controlpresencia, empleados y salas.
 * @returns {Promise<Array>} - Lista de objetos con { email, salaNombre }.
 */
function getPresenciaSalaData() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT e.email, s.nombre AS salaNombre
      FROM controlpresencia cp
      JOIN empleados e ON cp.idEmpleado = e.id
      JOIN salas s ON cp.idSala = s.id
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error en getPresenciaSalaData:', err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

/**
 * Obtiene el email y el estado de validez de un empleado a partir de su NIF.
 * @param {string} nif - NIF del empleado.
 * @returns {Promise<Object|null>} - Objeto con { email, valido } o null si no se encuentra.
 */
function getEmpleadoByNif(nif) {
  return new Promise((resolve, reject) => {
    // Se añade el campo "valido" a la consulta
    const query = 'SELECT email, valido FROM empleados WHERE nifnie = ?';
    connection.query(query, [nif], (err, results) => {
      if (err) {
        console.error('Error en getEmpleadoByNif:', err);
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = {
  getPresenciaSalaData,
  getEmpleadoByNif
};
