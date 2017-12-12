const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000; //porta padrão
const sql = require('mssql');
const connStr = "Server=169.57.143.154,51433;Database=Leandro;User Id=Leandro;Password=silva@2018;";

//fazendo a conexão global
sql.connect(connStr)
.then(conn => global.conn = conn)
.catch(err => console.log(err));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ 
    
     message: 'Funcionando!' 
}));


app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/', router);



//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}

router.get('/usuarios', function(req, res){
    execSQLQuery('SELECT [Id do Usuário], Nome, Email, Senha FROM dbo.Usuários', res);
})

router.get('/newuser', function(req, res){
    //execSQLQuery('SELECT [Id do Usuário], Nome, Email, Senha FROM dbo.Usuários', res);
    console.log(req);
    console.log(res)
})