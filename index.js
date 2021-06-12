const express = require ("express");
const app = express();
app.use(express.json());

//teste
//permissoes
var cors = require ('cors');
app.use(cors());

//porta que estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/',function (req, res) {
res.send("<h2>Times do campeonato brasileiro 2021, serie A:</h2>");
} 
  );

 //Array de um object com os nomes dos times e o Estado de cada um 
const times = [ 
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

//imprime o banco de dados
app.get('/times',function(req, res)  {
 res.send(times.filter(Boolean)); 
  }
    );

//busca no banco de dados usando o id, ou seja, busca cada linha da matriz em especifico
  app.get('/times/:id', function(req, res){
     const id = req.params.id - 1;
     const time = times [id];
     if (!time){
       res.send("time nao encontrada");
            }
            else {
              res.send(time);
            }
  }
  );

  //adciona um time na matriz 
  app.post('/times', (req,res) =>{
       console.log(req.body.time);
       const time = req.body.time;
       times.push(time);
       res.send("Adcionar um time")
  }
  );

  //troca um time da matriz por outro
  app.put('/times/:id', 
     (req, res) => {
       const id = req.params.id -1;
       const time = req.body.time;
       times[id] = time;
       res.send("time atulizado com sucesso")
     }
  )
  
  //deleta um time da matriz
  app.delete('/times/:id',
  (req, res) => {
     const id = req.params.id -1;
     delete times[id];
     res.send("time removida com sucesso");
  }
  );