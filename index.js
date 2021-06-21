const express = require ("express");
const app = express();
app.use(express.json());

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
     const mensagem = times [id];
     if (!mensagem){
       res.send("mensagem nao encontrada");
            }
            else {
              res.send(mensagem);
            }
  }
  );

  //adciona um time na matriz 
  app.post('/times', (req,res) =>{
       console.log(req.body.mensagem);
       const mensagem = req.body.mensagem;
       times.push(mensagem);
       res.send("Adcionar um time")
  }
  );

  //troca um time da matriz por outro
  app.put('/times/:id', 
     (req, res) => {
       const id = req.params.id -1;
       const mensagem = req.body.mensagem;
       times[id] = mensagem;
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

/*
  Daqui para baixo, uso o banco de dados MongoDB
*/

const mongodb = require('mongodb')
const password = process.env.PASSWORD || "asdf";
console.log(password);

const connectionString = `mongodb+srv://admin:${password}@cluster0.tomq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

(async()=>{
    const client = await mongodb.MongoClient.connect(connectionString, options);
    const db = client.db('myFirstDatabase');
    const times = db.collection('times');
    console.log(await times.find({}).toArray());

    app.get('/database',
        async function(req, res){
        res.send(await times.find({}).toArray());
    }
);

app.get('/database/:id',
    async function(req, res){
        const id = req.params.id;
        const mensagem = await times.findOne(
            {_id : mongodb.ObjectID(id)}
        );
        console.log(mensagem);
        if (!mensagem){
            res.send("Time não encontrado");
        } else {
            res.send(mensagem);
        }
    }
);

app.post('/database', 
    async (req, res) => {
        console.log(req.body);
        const mensagem = req.body;
        
        delete mensagem["_id"];

        mensagens.insertOne(mensagem);        
        res.send("Adicionar um time.");
    }
);

app.put('/database/:id',
    async (req, res) => {
        const id = req.params.id;
        const mensagem = req.body;

        console.log(mensagem);

        delete mensagem["_id"];

        const num_times = await times.countDocuments({_id : mongodb.ObjectID(id)});

        if (num_times !== 1) {
            res.send('Ocorreu um erro por conta do número de times');
            return;
        }

        await mensagens.updateOne(
            {_id : mongodb.ObjectID(id)},
            {$set : mensagem}
        );
        
        res.send("Time atualizado com sucesso.")
    }
)

app.delete('/database/:id', 
    async (req, res) => {
        const id = req.params.id;
        
        await times.deleteOne({_id : mongodb.ObjectID(id)});

        res.send("Time removido com sucesso");
    }
);

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

*/
