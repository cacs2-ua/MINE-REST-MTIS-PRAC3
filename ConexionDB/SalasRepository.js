const { connection } = require('./Conexion');

function insertarSala(salaData) {
  return new Promise((resolve, reject) => {
    const { codigoSala, nombre, nivel } = salaData;
    const query = 'INSERT INTO salas (codigoSala, nombre, nivel) VALUES (?, ?, ?)';
    connection.query(query, [codigoSala, nombre, nivel], (error, results) => {
      if (error) {
        console.error('Error al insertar la sala:', error);
        return reject(error);
      }
      console.log('Sala insertada correctamente con ID:', results.insertId);
      resolve(results.insertId);
    });
  });
}

function borrarSala(codigoSala) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM salas WHERE codigoSala = ?';
    connection.query(query, [codigoSala], (error, results) => {
      if (error) {
        console.error('Error al borrar la sala:', error);
        return reject(error);
      }
      console.log('Sala borrada correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

function modificarSala(salaData) {
  return new Promise((resolve, reject) => {
    const { codigoSala, nombre, nivel, id } = salaData;
    const query = 'UPDATE salas SET codigoSala = ?, nombre = ?, nivel = ? WHERE id = ?';
    connection.query(query, [codigoSala, nombre, nivel, id], (error, results) => {
      if (error) {
        console.error('Error al modificar la sala:', error);
        return reject(error);
      }
      console.log('Sala modificada correctamente. Afectados:', results.affectedRows);
      resolve(results.affectedRows);
    });
  });
}

function consultarSala(codigoSala) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM salas WHERE codigoSala = ?';
    connection.query(query, [codigoSala], (error, results) => {
      if (error) {
        console.error('Error al consultar la sala:', error);
        return reject(error);
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
  insertarSala,
  borrarSala,
  modificarSala,
  consultarSala,
}
