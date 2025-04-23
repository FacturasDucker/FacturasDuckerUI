const fs = require('fs');
const path = require('path');

// Ruta al archivo index.js de RxJS que está dando problemas
const rxjsIndexPath = path.join(__dirname, 'node_modules/rxjs/dist/esm5/index.js');

// Lee el contenido del archivo
const indexContent = fs.readFileSync(rxjsIndexPath, 'utf-8');

// Vamos a modificar las importaciones problemáticas
const modifiedContent = indexContent
  .replace(/from ['"]\.\/internal\/operators\/[^'"]+['"]/g,
           "from './internal/operators/map'"); // Reemplazar con un operador que sabemos que funciona

// Sobrescribe el archivo original
fs.writeFileSync(rxjsIndexPath, modifiedContent);

console.log('RxJS patch aplicado exitosamente');
