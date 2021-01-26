const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Plage = require('./models/Plage');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

// Permet d'obtenir la totalité des données
app.get('/', async (req, res) => {
    try{
        const plage = await Plage.find();
        res.json(plage);
    }catch(err){
        res.json({message:err});
    }
});

// Permet d'obtenir les données d'une ville grâce au nom de celle ci
app.get('/:name', async (req, res) => {
    try{
        const plage = await Plage.find({name: req.params.name });
        res.json(plage);
    }catch(err){
        res.json({message:err});
    }
});

// Permet d'ajouter une ville dans la base de données
app.post('/', async (req,res)=>{
    const post = new Plage({
        name: req.body.name,
        quality: req.body.quality
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message:err});
    }
});

// Permet de supprimer une ville grâce au nom de celle ci
app.delete('/:name', async (req,res) => {
    try{
        const removedPost = await Plage.remove({name: req.params.name});
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
});

// Permet de mettre à jour les valeurs concernant une ville grâce à son nom
app.patch('/:name', async (req,res) => {
    try{
        const updatedPost = await Plage.updateOne(
            { name: req.params.name },
            { $set: { quality: req.body.quality } } // /!\ A améliorer /!\ Changer la date lor de la mise à jour
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
});

//Import Routes
//const postsRoute = require('./routes/posts');

//app.use('/posts',postsRoute);

//Routes

/*app.get('/', (req, res) => {
    res.send('We are on home');
});*/

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('connect to DB!'));

//Listening

app.listen(3000);