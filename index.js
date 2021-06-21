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
    res.send("Hello de Novo");
    }
)

const mensagens = [ 
   {time: "Corinthians ", estado: " Sao Paulo " }, 
   {time: "Santos ", estado: " Sao Paulo" }, 
   {time: "Sao Paulo ", estado: " Sao Paulo "},
   {time: "Flamengo ", estado: " Rio De Janeiro "},
   {time: "America-MG ", estado: "Minas Gerais"},
   {time: "Atletico-PR ", estado: "Parana"},
   {time: "Atletico-GO", estado: "Goiais"},
   {time: "Bahia", estado: "Bahia"},
   {time: "Ceara SC ", estado: "Ceara"},
   {time: "Chapecoense", estado: " Santa Catarina"},
   {time: "Cuiaba ", estado: " Mato Grosso"},
   {time: "Fluminense", estado: " Rio De Janeiro "},
   {time: "Fortaleza", estado: " Ceara "},
   {time: "Gremio", estado: " Rio Grande do Sul "},
   {time: "Internacional", estado: " Rio Grande do Sul "},
   {time: "Juventude", estado: "  Rio Grande do Sul "},
   {time: "Palmeiras ", estado: " Sao Paulo "},
   {time: "Bragantino", estado: " Sao Paulo "},
   {time: "Sporte Recife", estado: " Pernambuco "},
   {time: "Atletico MG", estado: " Minas Gerais"}
   
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

