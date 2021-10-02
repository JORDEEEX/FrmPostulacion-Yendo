
const app = require('./app.js');

app.listen(app.get('port'));
console.log('server on port ', app.get('port'));
