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


const mongodb = require('mongodb')
const password = process.env.password || "asdf";
console.log(password);

const connectionString = 'mongodb+srv://admin:${password}@cluster0.tomq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
};

(async()=>{
  const client = await mongodb.MongoClient.connect{connectionString, options};
  const db = client.db{'myFirstDatabase'};
  const times = db.collection('times');
  console.log(awai times.find({}).toArray());
})();



  /*
  const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0.tomq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


senha: dkbDSLqvWq4vy2F5