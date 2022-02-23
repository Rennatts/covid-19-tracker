const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
require('dotenv').config();
const { spawn } = require('child_process');

//set up express
const app = express();


//allows us to use body json thing to create posts
app.use(express.json());


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//specify in which port our app will run
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=> console.log(`server has started at port ${PORT}`));

//set up mongoose
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        keepAlive: true
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connected");
    }); 


//const childPython = spawn('python', ['kaggle.py']);


/* childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
});


childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
});
    

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
});
     */

//set routes
const api = require('./routes/api');


app.use('/api/covid', api);
