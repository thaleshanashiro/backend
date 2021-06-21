const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/', 
    function (req, res){    
        res.send("Hello World");
    }
);

app.get('/hello',
function (req, res){    
    res.send("Hello de Novo");
    }
)

const mensagens = [
    "Elziele da Rocha", "Lucas Canova dos Santos", 0 
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
        const time = times[id];

        if (!time){
            res.send("Time não encontrado");
        } else {
            res.send(time);
        }
    }
)

app.post('/mensagens', 
    (req, res) => {
        console.log(req.body.time);
        const time = req.body.time;
        mensagens.push(time);
        res.send("Adicionar um time.")
    }
);

app.put('/mensagens/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const time = req.body.time;
        mensagens[id] = time;        
        res.send("Time atualizado com sucesso.")
    }
)

app.delete('/mensagens/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete times[id];

        res.send("Time removido com sucesso");
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
        const time = await times.findOne(
            {_id : mongodb.ObjectID(id)}
        );
        console.log(time);
        if (!time){
            res.send("Time não encontrado");
        } else {
            res.send(time);
        }
    }
);

app.post('/database', 
    async (req, res) => {
        console.log(req.body);
        const time = req.body;
        
        delete time["_id"];

        mensagens.insertOne(time);        
        res.send("Adicionar um time.");
    }
);

app.put('/database/:id',
    async (req, res) => {
        const id = req.params.id;
        const time = req.body;

        console.log(time);

        delete time["_id"];

        const num_mtimes = await times.countDocuments({_id : mongodb.ObjectID(id)});

        if (num_times !== 1) {
            res.send('Ocorreu um erro por conta do número de times');
            return;
        }

        await mensagens.updateOne(
            {_id : mongodb.ObjectID(id)},
            {$set : time}
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
