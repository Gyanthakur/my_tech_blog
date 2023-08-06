import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
const __dirname = path.resolve()
//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);
app.use(express.static(path.join(__dirname,"./client/build")));

app.get('*', function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })
})


const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


const URL =process.env.MONGODU_URI ||  `mongodb://${USERNAME}:${PASSWORD}@ac-fnc42sy-shard-00-00.idryvvh.mongodb.net:27017,ac-fnc42sy-shard-00-01.idryvvh.mongodb.net:27017,ac-fnc42sy-shard-00-02.idryvvh.mongodb.net:27017/?ssl=true&replicaSet=atlas-dezufb-shard-0&authSource=admin&retryWrites=true&w=majority`;
Connection(URL);