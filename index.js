const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/hello',
function (req, res){    
    res.send("Times da Série A");
    }
)

const mensagens = [ 
   {time: "Corinthians "}, 
   {time: "Santos "}, 
   {time: "Sao Paulo "},
   {time: "Flamengo "},
   {time: "America-MG "},
   {time: "Atletico-PR "},
   {time: "Atletico-GO"},
   {time: "Bahia"},
   {time: "Ceara SC "},
   {time: "Chapecoense"},
   {time: "Cuiaba "},
   {time: "Fluminense"},
   {time: "Fortaleza"},
   {time: "Gremio"},
   {time: "Internacional"},
   {time: "Juventude"},
   {time: "Palmeiras "},
   {time: "Bragantino"},
   {time: "Sporte Recife"},
   {time: "Atletico MG"}
   
  ];

app.get('/mensagens',
    function(req, res){
        // res.send(mensagens);
        res.send(mensagens.filter(Boolean));
    }
);

app.get('/mensagens/:id',
    function(req, res){
        const id = req.params.id - 1;
        const mensagem = mensagens[id];

        if (!mensagem){
            res.send("Mensagem não encontrada");
        } else {
            res.send(mensagem);
        }
    }
)

app.post('/mensagens', 
    (req, res) => {
        console.log(req.body.mensagem);
        const mensagem = req.body.mensagem;
        mensagens.push(mensagem);
        res.send("criar uma mensagem.")
    }
);

app.put('/mensagens/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const mensagem = req.body.mensagem;
        mensagens[id] = mensagem;        
        res.send("Mensagem atualizada com sucesso.")
    }
)

app.delete('/mensagens/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete mensagens[id];

        res.send("Mensagem removida com sucesso");
    }
);
