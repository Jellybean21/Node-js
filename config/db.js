let mysql = require('mysql')
console.log('get connected...')
let connection = mysql.createConnection({
  host  : 'localhost',
  user : 'root',
  password : '',
  database : 'tutoriel'

})
connection.connect()
module.exports= connection
