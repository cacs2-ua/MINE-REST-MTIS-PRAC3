module.exports.getHeaderFromRaw = function getHeaderFromRaw(rawHeaders, headerName) {
        // rawHeaders es un array tipo: [ 'Accept', 'application/json', 'wSKey', 'soap-mtis-prac1', ...]
        for (let i = 0; i < rawHeaders.length; i += 2) {
            if (rawHeaders[i].toLowerCase() === headerName.toLowerCase()) {
              return rawHeaders[i + 1];
            }
          }
          return null;
}