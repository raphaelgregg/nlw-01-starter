// importa a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

// criar objeto que irá fazer operações no banco de dados
const  db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// //1 utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//   // Criar uma tabela
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `);

//   // 2 Inserir dados na tabela
//   // const query = `
//   // INSERT INTO places (
//   //   image,
//   //   name,
//   //   address1,
//   //   address2,
//   //   state,
//   //   city,
//   //   items
//   //   ) VALUES (?,?,?,?,?,?,?); 
//   //   ` 
//   // const values = [
//   //   "https://images.unsplash.com/photo-1535402970399-f27bd420e4fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   //   "Colectoria",
//   //   "Guilherme gemballa, jardim amendoin",
//   //   "numero 260",
//   //   "santa catarina",
//   //   "Rio do sul",
//   //   "Resíduos Eletronicos, Lampadas"
//   //   ]

//   //   function afterInsertData(err) {
//   //     if(err) {
//   //       return console.log(err);
//   //     }

//   //     console.log("Cadastrado com sucesso");
//   //     console.log(this);
//   //   }

//   //   db.run(query, values, afterInsertData);

//   // 3 Consultar dados na tabela
//     // db.all(`SELECT * FROM places`, function(err,rows) {
//     //   if(err) {
//     //     return console.log(err);
//     //   }
//     //   console.log("Aqui estão os seus registros");
//     //   console.log(rows);
//     // });

//   // 4 Deletar um dado da tabela
//   // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
//   //   if(err) {
//   //     return console.log(err);
//   //   }
//   //   console.log("Aqui estão os seus registros");
//   //   console.log(rows);
//   // });

// });