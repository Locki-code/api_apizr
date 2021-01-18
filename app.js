const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Plage = require('./models/Plage');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try{
        const plage = await Plage.find();
        res.json(plage);
    }catch(err){
        res.json({message:err});
    }
});

app.get('/:name', async (req, res) => {
    try{
        const plage = await Plage.find({name: req.params.name });
        res.json(plage);
    }catch(err){
        res.json({message:err});
    }
});

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

app.delete('/:name', async (req,res) => {
    try{
        const removedPost = await Plage.remove({name: req.params.name});
        res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
});

app.patch('/:name', async (req,res) => {
    try{
        const updatedPost = await Plage.updateOne(
            { name: req.params.name },
            { $set: { quality: req.body.quality } }
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