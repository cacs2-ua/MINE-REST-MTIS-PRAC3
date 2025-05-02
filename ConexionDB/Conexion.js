const mysql = require('mysql2');

// Configuración de la conexión a la base de datos.
// Asegúrate de ajustar estos valores según la configuración de tu entorno.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           
  password: 'root',       
  database: 'edificio_inteligente'  
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL establecida.');
});

function obtenerRestKey() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM restkey WHERE id = ?';
    connection.query(query, [1], (error, results) => {
      if (error) {
        console.error('Error al consultar la restKey:', error);
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

module.exports = {
  connection,
  obtenerRestKey
};
