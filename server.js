const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
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
//router.get('/', (req, res) => res.json({ 
    
//     message: 'Funcionando!' 
//}));


app.use('/', router);



//inicia o servidor
app.listen(port);
//console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}

router.get('/', function(req, res){
    //execSQLQuery('SELECT DISTINCT TOP (100) dbo.Receitas.[Id da Receita], dbo.Receitas.Data, dbo.Receitas.[Data prox contato], dbo.Origens.[Id da Origem], dbo.Origens.Origem, dbo.Pacientes.Nome, dbo.Médicos.Nome AS Médico, dbo.[Último Andamento].[Id do Fluxo], dbo.[Último Andamento].Fluxo, dbo.[Último Andamento].Etapa, dbo.[Último Andamento].Responsável, dbo.[Último Andamento].Andamento_Id, dbo.[Último Andamento].[Id da Etapa], dbo.[Último Andamento].Detalhamento, dbo.Receitas.[Em Uso], dbo.Receitas.Time, dbo.[Último Andamento].Distribuição, dbo.[Tipo de entrega].[Id do tipo de entrega], dbo.[Tipo de entrega].[Tipo de entrega], dbo.[Tipo de entrega].[Ordem], dbo.Receitas.[Previsão de Entrega], dbo.Médicos.[Id do Conselho], dbo.Médicos.CRM, dbo.Médicos.[CRM UF], dbo.[Último Andamento].[Código da Requisição], dbo.[Último FollowUp].ID AS [Id FollowUp], dbo.[Último FollowUp].FollowUp, dbo.[Último Andamento].[Id do Responsável], dbo.Receitas.Status, dbo.[Tipo de entrega].[Id do Fluxo] AS IdFluxoEntrega, dbo.[Códigos de Requisições Concatenados].Requisição FROM dbo.Receitas LEFT OUTER JOIN dbo.[Códigos de Requisições Concatenados] ON dbo.Receitas.[Id da Receita] = dbo.[Códigos de Requisições Concatenados].[Id da Receita] LEFT OUTER JOIN dbo.[Último FollowUp] ON dbo.Receitas.[Id da Receita] = dbo.[Último FollowUp].[Id da Receita] LEFT OUTER JOIN dbo.[Tipo de entrega] ON dbo.Receitas.[Id da Forma de Entrega] = dbo.[Tipo de entrega].[Id do tipo de entrega] LEFT OUTER JOIN dbo.[Último Andamento] ON dbo.Receitas.[Id da Receita] = dbo.[Último Andamento].[Id da Receita] LEFT OUTER JOIN dbo.Pacientes ON dbo.Receitas.[Id do Paciente] = dbo.Pacientes.[Id do Paciente] LEFT OUTER JOIN dbo.Médicos ON dbo.Receitas.[Id do Médico] = dbo.Médicos.[Id do Médico] LEFT OUTER JOIN dbo.Origens ON dbo.Receitas.[Id da Origem] = dbo.Origens.[Id da Origem]', res);
    execSQLQuery('SELECT [Id do Usuário], Nome, Email, Senha FROM dbo.Usuários', res);
})