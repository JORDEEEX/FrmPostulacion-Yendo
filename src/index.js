
const app = require('./app.js');

app.listen(app.get('port'));
console.log('server on port ', app.get('port'));

//main();
/**
 * crear proyecto firebase
 * crear tabla1: nombres, apellidos, dni, telefono, correo, direccion, provincia, distrito, texto, label(sentimiento), score(sentimiento), document
 * crear 
 * "sadness": 0.620756,
    "joy": 0.031532,
    "fear": 0.5351,
    "disgust": 0.00185,
    "anger": 0.053375
    jordy.samuel.15@gmail.com
    buscar api traductor
 */