//import express from 'express';
const express = require('express');
const app = express();

// pegar o banco de dados
const db = require("./database/db");

//interpretar aquivs json
//app.use(express.json());

//configurar pasta public
app.use(express.static("public"));

// habilitar o uso do require.body na nossa aplicação
app.use(express.urlencoded({extended: true }));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: app,
  noCache: true,
});

// configurar caminhos da minha aplicação
// pagina inicial
// req: Requisição
// res: Resposta
app.get("/", (require, response) => {
  return response.render("index.html");
});

app.get("/create-point", (require, response) => {
  // require.query: Query String da nossa URL
  // const ent = require.query;

  return response.render("create-point.html");
});

app.post("/save-point", (require, response) => {
  // require.body: O corpo do nosso formulario
  // console.log(require.body);

  // inserir dados no banco de dados
      const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?); 
        ` 
      const values = [
        require.body.image,
        require.body.name,
        require.body.address,
        require.body.address2,
        require.body.state,
        require.body.city,
        require.body.items,
        ]

      function afterInsertData(err) {
        if(err) {
          console.log(err);
          return response.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return response.render("create-point.html", { saved: true });
      }

        db.run(query, values, afterInsertData);
});


app.get("/search", (require, response) => {

  const search = require.query.search;

  if(search == "") {
    //pesquisa vazia
    return response.render("search-results.html", { total: 0}); 
  }

  // pegar os dados do banco de dados,
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows) {
      if(err) {
        return console.log(err);
      }
      console.log("Aqui estão os seus registros");
      console.log(rows);

      const total = rows.length;

      // mostrar a pagina html com os dados do banco de dados
      return response.render("search-results.html", { places: rows, total: total});
    });

});

//ligar servidor
app.listen(3333, () => {
  console.log('🚀 server started on port 3333!');
});